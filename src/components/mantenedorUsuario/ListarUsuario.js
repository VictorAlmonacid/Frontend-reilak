import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import moment from 'moment';
import Swal from 'sweetalert2';
import verificador from 'verificador-rut'
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from "react-redux";
import { userStartLoading, userStartUpdate, userSetActive, userStartAddNew, userClearActiveEvent } from "../../actions/usuarios";
import { userFiltroEstado, userFiltroRol, userBuscar } from "../../actions/filtros";
import { uiOpenModal } from '../../actions/ui';
import { ResumenUsuario } from './ResumenUsuario';


const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    name: '',
    rut: '',
    segundoNombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    area: '',
    cargo: '',
    fono: '',
    nacimiento: nowPlus1.toDate(),
    rol: '',
    email: '',
    imgusuario: '',
    emailp: '',
    permisos: [],
    password: '',
    //Funcionalidades Form
    stepActual: 1,
    estado: '',
    buscar: '',
    nameFile: "",
}

const fileName = {
    nameFile: ""
}

export const ListarUsuario = () => {

    const { activeUser } = useSelector(state => state.users);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userStartLoading());
    }, [dispatch])

    const [formValues, setFormValues] = useState(initEvent);

    const {
        estado,
        buscar
    } = formValues;

    useEffect(() => {
        if (activeUser) {
            setFormValues({
                ...formValues,
                stepActual: 1,
            });
            setFormValues(activeUser);
        } else {
            setFormValues(initEvent);

        }
    }, [activeUser, setFormValues])

    const [titleValid, setTitleValid] = useState(true);

    const {
        //Valores Form
        name,
        rut,
        segundoNombre,
        apellidoPaterno,
        apellidoMaterno,
        area,
        cargo,
        fono,
        nacimiento,
        rol,
        email,
        emailp,
        permisos,
        password,
        //Funionalidades Form
        stepActual = 1,

    } = formValues;

    /***********************************************************
SUBIDA DE ARCHIVOS
**********************************************************/

    const [selectedFile, setSelectedFile] = useState("");

    const imageHandleChange = (e) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
            const file = e.target.files[0];


        }
    };
    useEffect(() => {
        if (selectedFile) {
            formValues.imgusuario = selectedFile;
        }
    }, [selectedFile])


    fileName.nameFile = selectedFile.name;

    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            nacimiento: e
        })
    }


    const handlePermisos = ({ target }) => {
        const arrpe = ['Publicaciones', 'Eventos'];
        const arre = ['Eventos'];
        const arrp = ['Publicaciones'];
        if (target.value == "Colaborador") {
            setFormValues({
                ...formValues,
                permisos: arrp,
                rol: target.value
            });
        }
        if (target.value == "Jefatura") {
            setFormValues({
                ...formValues,
                permisos: arre,
                rol: target.value
            });
        }
        if (target.value == "Administrador") {
            setFormValues({
                ...formValues,
                permisos: arrpe,
                rol: target.value
            });
        }
    }

    //Handles
    const handleStepActual = (valor) => {
        if (valor == "anterior") {
            if (stepActual == 2) {
                setFormValues({
                    ...formValues,
                    stepActual: stepActual - 1,
                });
            }
            if (stepActual == 3) {
                setFormValues({
                    ...formValues,
                    stepActual: stepActual - 1,
                });
            }
            if (stepActual == 4) {
                setFormValues({
                    ...formValues,
                    stepActual: stepActual - 1,
                });
            }
        } else if (valor == "siguiente") {
            if (stepActual == 1) {
                if (verificador(formValues.rut) == false && (!activeUser)) {
                    return Swal.fire('Error', 'El rut es incorrecto', 'error');
                }
                if (formValues.name == "" && (!activeUser)) {
                    return Swal.fire('Error', 'El nombre es obligatorio', 'error');
                }
                if (formValues.apellidoPaterno == "" && (!activeUser)) {
                    return Swal.fire('Error', 'El apellido paterno es obligatorio', 'error');
                }
                setFormValues({
                    ...formValues,
                    stepActual: stepActual + 1,
                });
            }
            if (stepActual == 2) {
                if (formValues.emailp == "" && (!activeUser)) {
                    return Swal.fire('Error', 'El email personal es obligatorio', 'error');
                }
                if (formValues.email == "" && (!activeUser)) {
                    return Swal.fire('Error', 'El email corporativo es obligatorio', 'error');
                }
                if (formValues.fono == "" && (!activeUser)) {
                    return Swal.fire('Error', 'El número telefonico es obligatorio', 'error');
                }
                setFormValues({
                    ...formValues,
                    stepActual: stepActual + 1,
                });
            }
            if (stepActual == 3) {
                setFormValues({
                    ...formValues,
                    stepActual: stepActual + 1,
                });
            }
            if (stepActual == 4) {
                if (formValues.area == "" && (!activeUser)) {
                    return Swal.fire('Error', 'El área es obligatoria', 'error');
                }
                if (formValues.cargo == "" && (!activeUser)) {
                    return Swal.fire('Error', 'El cargo es obligatorio', 'error');
                }
            }
        }
    };


    const { users } = useSelector(state => state.users);
    const useractual = useSelector(state => state.auth);

    // Anular Usuario
    const anularUsuario = (id, estado) => {
        if (estado === "Activo") {
            estado = "Inactivo";
            const usuario = { id, estado };
            dispatch(userStartUpdate(usuario));

        } else if (estado === "Inactivo") {
            estado = "Activo";
            const usuario = { id, estado };
            dispatch(userStartUpdate(usuario));
        }

    };

    const handleInputChanges = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleEstadoChange = ({ target }) => {
        dispatch(userFiltroEstado(target.value));
    }

    const handleRol = ({ target }) => {
        dispatch(userFiltroRol(target.value));
    }

    const handleBuscar = () => {
        dispatch(userBuscar(formValues.buscar));
    }

    const editarUsuario = (rut, id, name, apellidoPaterno, apellidoMaterno, email, area, cargo, segundoNombre, rol, estado, fono, nacimiento, imgusuario, ingreso, emailp, password) => {
        const prueba = { rut, id, name, apellidoPaterno, apellidoMaterno, email, area, cargo, segundoNombre, rol, estado, fono, nacimiento, imgusuario, ingreso, emailp, password };
        console.log("Prueba", prueba)
        dispatch(userSetActive(prueba));
    };

    const handleClickNew = (id, name, email, segundoNombre, apellidoPaterno, apellidoMaterno, area, fono, nacimiento, rol, cargo, rut, imgusuario, ingreso, emailp, estado) => {
        const prueba = { id, name, email, segundoNombre, apellidoPaterno, apellidoMaterno, area, fono, nacimiento, rol, cargo, rut, imgusuario, ingreso, emailp, estado };
        dispatch(userSetActive(prueba));
        dispatch(uiOpenModal());
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('rut', formValues.rut);
        formData.set('segundoNombre', formValues.segundoNombre);
        formData.set('apellidoPaterno', formValues.apellidoPaterno);
        formData.set('apellidoMaterno', formValues.apellidoMaterno);
        formData.set('area', formValues.area);
        formData.set('cargo', formValues.cargo);
        formData.set('fono', formValues.fono);
        formData.set('nacimiento', formValues.nacimiento);
        formData.set('rol', formValues.rol);
        formData.set('email', formValues.email);
        formData.set('emailp', formValues.emailp);
        formData.set('imgusuario', formValues.imgusuario);
        formData.set('name', formValues.name);
        formData.set('permisos', formValues.permisos);
        formData.set('password', formValues.password);
        if (activeUser) {
            formData.set('id', activeUser.id);
            dispatch(userStartUpdate(formData))
        } else {
            dispatch(userStartAddNew(formData));
        }
        setTitleValid(true);
    }

    return (
        <div className="main__home">
            <div className="container__listarusaurios">
                <div className="mantenedor">
                    <div className="crearusuario">
                        <form
                            className="cuform"
                            onSubmit={handleSubmitForm}
                        >
                            <div className="cutitulo">
                                {(activeUser) ? 'Editar usuario' : 'Nuevo usuario'}
                            </div>
                            <div className="cubody">
                                {
                                    (stepActual == 1) ?
                                        <div class="body-usuario-ysm">
                                            <div className="input-contenedor-usuario-ysm">
                                                <input className="input-usuario-ysm 1" type="text" id="rut" name="rut" onChange={handleInputChanges} value={rut} placeholder="Ingrese su RUT..."></input>
                                            </div>
                                            <div className="input-contenedor-usuario-ysm">
                                                <input className="input-usuario-ysm 2" type="text" id="nombre" name="name" onChange={handleInputChanges} value={name} placeholder="Ingrese su nombre..."></input>
                                            </div>
                                            <div className="input-contenedor-usuario-ysm">
                                                <input className="input-usuario-ysm 3" type="text" id="segundoNombre" name="segundoNombre" onChange={handleInputChanges} value={segundoNombre} placeholder="Ingrese su segundo nombre..."></input>
                                            </div>
                                            <div className="input-contenedor-usuario-ysm">
                                                <input className="input-usuario-ysm 4" type="text" id="apellidoPaterno" name="apellidoPaterno" onChange={handleInputChanges} value={apellidoPaterno} placeholder="Ingrese su apellido paterno..."></input>
                                            </div>
                                        </div>
                                        :
                                        (stepActual == 2) ?
                                            <div class="body-usuario-ysm">
                                                <div className="input-contenedor-usuario-ysm">
                                                    <input className="input-usuario-ysm" type="text" id="apellidoMaterno" name="apellidoMaterno" onChange={handleInputChanges} value={apellidoMaterno} placeholder="Ingrese su apellido materno..."></input>
                                                </div>
                                                <div className="input-contenedor-usuario-ysm">
                                                    <input className="input-usuario-ysm" type="text" id="emailp" name="emailp" onChange={handleInputChanges} value={emailp} placeholder="Ingrese su email personal..."></input>
                                                </div>
                                                <div className="input-contenedor-usuario-ysm">
                                                    <input className="input-usuario-ysm" type="text" id="email" name="email" onChange={handleInputChanges} value={email} placeholder="Ingrese su email corporativo..."></input>
                                                </div>
                                                <div className="input-contenedor-usuario-ysm">
                                                    <input className="input-usuario-ysm" type="text" id="fono" name="fono" onChange={handleInputChanges} value={fono} placeholder="Ingrese su fono..."></input>
                                                </div>
                                            </div>
                                            :
                                            (stepActual == 3) ?
                                                <div class="body-usuario-ysm">
                                                    <div className="input-contenedor-usuario-ysm">
                                                        <DateTimePicker
                                                            onChange={handleEndDateChange}
                                                            value={dateEnd}
                                                            className="input-usuario-ysm"
                                                            format="y-MM-dd"
                                                        />
                                                    </div>
                                                    <div className="input-contenedor-usuario-ysm">
                                                        <input type="file" class="input-usuario-ysm" name="file" id="customFile" onChange={imageHandleChange} accept=".img,.png,.jpg,.jepg" />
                                                    </div>
                                                    <div className="input-contenedor-usuario-ysm">
                                                        <input type="text" className="input-usuario-ysm" value="Hoy" placeholder="Hoy" disabled />
                                                    </div>
                                                    <div className="input-contenedor-usuario-ysm">
                                                        <input className="input-usuario-ysm" type="text" name="empresa" value="Reilak" placeholder="Reilak" disabled></input>
                                                    </div>
                                                </div>
                                                :
                                                (stepActual == 4) ?
                                                    <div class="body-usuario-ysm">
                                                        <div className="input-contenedor-usuario-ysm">
                                                            <select className="input-usuario-ysm" name="rol" onChange={handlePermisos} >
                                                                {(rol == "Colaborador") ? <option value="Colaborador" selected>Colaborador</option> : <option value="Colaborador">Colaborador</option>}
                                                                <option value="Jefatura">Jefatura</option>
                                                                {(rol == "Jefatura") ? <option value="Jefatura" selected>Jefatura</option> : <option value="Jefatura">Jefatura</option>}
                                                                {(rol == "Administrador") ? <option value="Administrador" selected>Administrador</option> : <option value="Administrador">Administrador</option>}
                                                            </select>
                                                        </div>
                                                        <div className="input-contenedor-usuario-ysm">
                                                            <select className="input-usuario-ysm" onChange={handleInputChanges} name="area" >
                                                                {(area == "Recursos humanos") ? <option value="Recursos humanos" selected>Recursos humanos</option> : <option value="Recursos humanos">Recursos humanos</option>}
                                                                {(area == "Finanzas") ? <option value="Finanzas" selected>Finanzas</option> : <option value="Finanzas">Finanzas</option>}
                                                                {(area == "Marketing") ? <option value="Marketing" selected>Marketing</option> : <option value="Marketing">Marketing</option>}
                                                            </select>
                                                        </div>
                                                        <div className="input-contenedor-usuario-ysm">
                                                            <select className="input-usuario-ysm" name="cargo" onChange={handleInputChanges} >
                                                                {(cargo == "Administrativo Credito") ? <option value="Administrativo Credito" selected>Administrativo Credito</option> : <option value="Administrativo Credito" >Administrativo Credito</option>}
                                                                {(cargo == "Gerente Administrativo") ? <option value="Gerente Administrativo" selected>Gerente Administrativo</option> : <option value="Gerente Administrativo">Gerente Administrativo</option>}
                                                                {(cargo == "Jefe de control de calidad") ? <option value="Jefe de control de calidad" selected>Jefe de control de calidad</option> : <option value="Jefe de control de calidad" >Jefe de control de calidad</option>}
                                                            </select>
                                                        </div>
                                                        <div className="input-contenedor-usuario-ysm">
                                                            <input className="input-usuario-ysm" type="password" name="password" value={password} onChange={handleInputChanges} placeholder="Ingrese su contraseña..."></input>
                                                        </div>
                                                    </div>
                                                    : ""}
                            </div>
                            <div className="cufooter">
                                <div className="cufooter-izquierda">
                                    <i class="fas fa-arrow-left" onClick={() => { handleStepActual("anterior"); }}></i>
                                </div>
                                <div className="cufooter-mitad">
                                    {(stepActual == 4) ? <button type="submit" class="button button2"><span>{(activeUser) ? 'Editar usuario' : 'Nuevo usuario'}</span></button> : ""}
                                </div>
                                <div className="cufooter-derecha">
                                    <i class="fas fa-arrow-right" onClick={() => { handleStepActual("siguiente"); }}></i>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="listausuarios">
                        <div className="lutitulo">
                            Lista de Usuarios
                        </div>
                        <div className="lufiltros">
                            <div className="lufiltros-apartado">
                                <select class="form-control" onChange={handleRol} name="rol" id="exampleFormControlSelect1">
                                    <option defaultValue>Seleccione un rol...</option>
                                    <option value="Colaborador">Colaborador</option>
                                    <option value="Jefatura">Jefatura</option>
                                    <option value="Administrador">Administrador</option>
                                </select>
                            </div>
                            <div className="lufiltros-apartado">
                                <select class="form-control" onChange={handleEstadoChange} name="estado" id="exampleFormControlSelect2">
                                    <option defaultValue>Seleccione un estado...</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                            <div className="lufiltros-apartado">
                                <input type="text" className="form-control btnBuscar" value={buscar} name="buscar" onChange={handleInputChanges} placeholder="Buscar" />
                            </div>
                            <div className="lufiltros-apartado">
                                <button type="submit" onClick={handleBuscar} name="leso" class="btn btn-primary ">Buscar</button>
                            </div>
                        </div>
                        <div className="lubody">
                            <div class="tbl-header">
                                <table cellpadding="0" cellspacing="0" border="0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Rut</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Apellido Paterno</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Cargo</th>
                                            <th scope="col">Rol</th>
                                            <th scope="col">Permisos</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="tbl-content">
                                <table cellpadding="0" cellspacing="0" border="0">
                                    <tbody>
                                        {users.map(({ rut, id, name, apellidoPaterno, apellidoMaterno, email, area, cargo, segundoNombre, rol, estado, fono, nacimiento, imgusuario, ingreso, emailp, password }, i) =>
                                            <tr key={i}>
                                                <td>{rut}</td>
                                                <td>{name}</td>
                                                <td>{apellidoPaterno}</td>
                                                <td>{estado}</td>
                                                <td>{area}</td>
                                                <td>{cargo}</td>
                                                <td>{rol}</td>
                                                <td>
                                                    <td>
                                                        {(useractual.rol == "Administrador") ?
                                                            <i className="fas fa-ban" onClick={() => { anularUsuario(id, estado); }}></i>
                                                            :
                                                            ""}
                                                    </td>
                                                    <td>
                                                        {(useractual.rol == "Administrador") ?

                                                            <i className="fas fa-pencil-alt iconos-lu" onClick={() => { editarUsuario(rut, id, name, apellidoPaterno, apellidoMaterno, email, area, cargo, segundoNombre, rol, estado, fono, nacimiento, imgusuario, ingreso, emailp, password); }}></i>

                                                            :
                                                            ""}
                                                    </td>
                                                    <td>
                                                        <i class="fas fa-info-circle iconos-lu" onClick={() => { handleClickNew(id, name, email, segundoNombre, apellidoPaterno, apellidoMaterno, area, fono, nacimiento, rol, cargo, rut, imgusuario, ingreso, emailp, estado); }}></i>
                                                        <ResumenUsuario />
                                                    </td>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}