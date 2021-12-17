import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
//Verificador
import Swal from 'sweetalert2';
import verificador  from 'verificador-rut'

import { userStartAddNew, userStartUpdate, userClearActiveEvent } from '../../actions/usuarios';

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
}

const fileName = {
    nameFile: ""
}

export const MantenedorUsuario2 = () => {

    

    const { activeUser } = useSelector(state => state.users);
    const useractual = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initEvent);


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

          //Handles
          const handleStepActual = (valor) => {
            if(valor == "anterior"){            
                if(stepActual == 2){
                    setFormValues({
                        ...formValues,
                        stepActual: stepActual - 1,
                    });
                  }
                  if(stepActual == 3){
                    setFormValues({
                        ...formValues,
                        stepActual: stepActual - 1,
                    });
                  }
                  if(stepActual == 4){
                    setFormValues({
                        ...formValues,
                        stepActual: stepActual - 1,
                    });
                  }
            }else if(valor == "siguiente"){
                if(stepActual == 1){
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
                if(stepActual == 2){
                    console.log(stepActual);
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
                  if(stepActual == 3){
                    setFormValues({
                        ...formValues,
                        stepActual: stepActual + 1,
                    });
                  }
                  if(stepActual == 4){
                    if (formValues.area == "" && (!activeUser)) {
                        return Swal.fire('Error', 'El área es obligatoria', 'error');
                    }
                    if (formValues.cargo == "" && (!activeUser)) {
                        return Swal.fire('Error', 'El cargo es obligatorio', 'error');
                    }
                  }
            }      
        };

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
        if(target.value == "Colaborador"){
            setFormValues({
                ...formValues,
                permisos: arrp,
                rol: target.value
            });
    }
        if(target.value == "Jefatura"){
            setFormValues({
                ...formValues,
                permisos: arre,
                rol: target.value
            });
    }
        if(target.value == "Administrador"){
            setFormValues({
                ...formValues,
                permisos: arrpe,
                rol: target.value
            });
    }
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleCancelar = () => {
        dispatch(userClearActiveEvent());
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
            console.log("FormValues",formValues);
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
        if (activeUser) {
            formData.set('id', activeUser.id);
            formData.set('password', formValues.password);
            dispatch(userStartUpdate(formData))       
        } else {
            dispatch(userStartAddNew(formData));
        }
        setTitleValid(true);       
    }



    return (
        <div className="main__home">
            <form
                className="contenedor-usuario-ysm"
                onSubmit={handleSubmitForm}
            >            
                <div class="header-usuario-ysm">
                    <div className="titulo-usuario-ysm">{(activeUser) ? 'Editar usuario' : 'Nuevo usuario'}</div>
                </div>
                {
                (stepActual == 1) ?
                    <div class="body-usuario-ysm">
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm 1" type="text" id="rut" name="rut" onChange={handleInputChange} value={rut} placeholder="Ingrese su RUT..."></input>
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm 2" type="text" id="nombre" name="name" onChange={handleInputChange} value={name} placeholder="Ingrese su nombre..."></input>
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm 3" type="text" id="segundoNombre" name="segundoNombre" onChange={handleInputChange} value={segundoNombre} placeholder="Ingrese su segundo nombre..."></input>
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm 4" type="text" id="apellidoPaterno" name="apellidoPaterno" onChange={handleInputChange} value={apellidoPaterno} placeholder="Ingrese su apellido paterno..."></input>
                        </div>                        
                    </div>
                :
                (stepActual == 2) ?
                    <div class="body-usuario-ysm">
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="text" id="apellidoMaterno" name="apellidoMaterno" onChange={handleInputChange} value={apellidoMaterno} placeholder="Ingrese su apellido materno..."></input>
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="text" id="emailp" name="emailp" onChange={handleInputChange} value={emailp} placeholder="Ingrese su email personal..."></input>       
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="text" id="email" name="email" onChange={handleInputChange} value={email} placeholder="Ingrese su email corporativo..."></input>                            
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                        <input className="input-usuario-ysm" type="text" id="fono" name="fono" onChange={handleInputChange} value={fono} placeholder="Ingrese su fono..."></input>
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
                        />
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input type="file" class="input-usuario-ysm" name="file" id="customFile" onChange={imageHandleChange} accept=".img,.png,.jpg,.jepg" />          
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input type="text" className="input-usuario-ysm" value="Hoy" placeholder="Hoy" disabled/>                        
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
                                {(rol == "Colaborador")?<option value="Colaborador" selected>Colaborador</option>:<option value="Colaborador">Colaborador</option>}
                                <option value="Jefatura">Jefatura</option>
                                {(rol == "Jefatura")?<option value="Jefatura" selected>Jefatura</option>:<option value="Jefatura">Jefatura</option>}
                                {(rol == "Administrador")?<option value="Administrador" selected>Administrador</option>:<option value="Administrador">Administrador</option>}
                            </select>
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <select className="input-usuario-ysm" onChange={handleInputChange} name="area" >
                                {(area == "Recursos humanos")?<option value="Recursos humanos" selected>Recursos humanos</option>:<option value="Recursos humanos">Recursos humanos</option>}
                                {(area == "Finanzas")?<option value="Finanzas" selected>Finanzas</option>:<option value="Finanzas">Finanzas</option>}
                                {(area == "Marketing")?<option value="Marketing" selected>Marketing</option>:<option value="Marketing">Marketing</option>}
                            </select>     
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                        <select className="input-usuario-ysm" name="cargo" onChange={handleInputChange} >                             
                                {(cargo == "Administrativo Credito")?<option value="Administrativo Credito" selected>Administrativo Credito</option>:<option value="Administrativo Credito" >Administrativo Credito</option>}                  
                                {(cargo == "Gerente Administrativo")?<option value="Gerente Administrativo" selected>Gerente Administrativo</option>:<option value="Gerente Administrativo">Gerente Administrativo</option>}
                                {(cargo == "Jefe de control de calidad")?<option value="Jefe de control de calidad" selected>Jefe de control de calidad</option>:<option value="Jefe de control de calidad" >Jefe de control de calidad</option>}
                            </select>   
                        </div>
                        <div className="input-contenedor-usuario-ysm">
                            <input className="input-usuario-ysm" type="password" name="password" value={password} onChange={handleInputChange} placeholder="Ingrese su contraseña..."></input>
                        </div>                  
                    </div>
                : ""}        
                <div className="stepbtn-usuario-ysm">
                    <div className="izquierda-stepbtn-ysm">                        
                        {(stepActual == 1)?<i class="fas fa-arrow-left fa-2x flecha-izquierda-icono-inactivo"/>:<i class="fas fa-arrow-left fa-2x flecha-izquierda-icono" onClick={() => { handleStepActual("anterior"); }} />}                                         
                    </div>
                    <div className="submitpbtn-usuario-ysm">
                    {(stepActual == 4)?<button type="submit" class="button button2"><span>{ (activeUser)? 'Editar usuario':'Nuevo usuario' }</span></button>:""}
                    </div>
                    <div className="derecha-stepbtn-ysm">
                        {(stepActual == 4)?<i class="fas fa-check fa-2x flecha-derecha-icono-inactivo"/>:<i class="fas fa-arrow-right fa-2x flecha-derecha-icono" onClick={() => { handleStepActual("siguiente"); }} />}
                    </div>
                </div>            
            </form>
        </div>
    )
}
