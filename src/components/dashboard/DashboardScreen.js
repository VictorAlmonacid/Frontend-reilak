import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { Bar, Pie } from 'react-chartjs-2';

import { eventsStartLoading } from "../../actions/eventos";
import {
    dashboardRadioCantidadEdad,
    dashboardRadioCantidadArea,
    dashboardRadioCantidadRol,
    dashboardRadioPublicacionesCategoria,
    dashboardRadioPublicacionesFecha,
    dashboardRadioPublicacionesUsuarios,
    dashboardRadioEventoCategoria,
    dashboardRadioEventoFecha,
    dashboardRadioEventosUsuarios,
    dashboardRadioCanalesUsuarios,
    dashboardRadioGruposUsuarios,
    dashboardRadioUsuariosChat,
    dashboardCantidadUsuarios,
    dashboardUsuariosConectados
} from "../../actions/dashboardRadios";
import { userStartLoading } from "../../actions/usuarios";
import { postStartLoading } from "../../actions/post";

//InitEvents
const initEvent = {
    //Opciones
    opcionTablas: 'Publicaciones',
    opcionDashboard: 'Usuarios',
    tabla: '',
    fullscreen: 'NoFullscreen'
}

export const DashboardScreen = () => {

    //UseDispatch
    const dispatch = useDispatch();

    //UseState
    const [formValues, setFormValues] = useState(initEvent);

    //UseEffect
    useEffect(() => {
        dispatch(eventsStartLoading());
        dispatch(userStartLoading());
        dispatch(postStartLoading());
        dispatch(dashboardRadioCantidadEdad());
        dispatch(dashboardRadioCantidadArea());
        dispatch(dashboardRadioCantidadRol());
        dispatch(dashboardRadioPublicacionesCategoria());
        dispatch(dashboardRadioPublicacionesFecha());
        dispatch(dashboardRadioPublicacionesUsuarios());
        dispatch(dashboardRadioEventoCategoria());
        dispatch(dashboardRadioEventoFecha());
        dispatch(dashboardRadioEventosUsuarios());
        dispatch(dashboardRadioCanalesUsuarios());
        dispatch(dashboardRadioGruposUsuarios());
        dispatch(dashboardRadioUsuariosChat());
        // dispatch(dashboardCantidadUsuarios());
        // dispatch(dashboardUsuariosConectados());
        setFormValues(initEvent);
    }, [setFormValues])

    //UseSelector
    const { users } = useSelector(state => state.users);
    const { posts } = useSelector(state => state.post);
    const { events } = useSelector(state => state.events);
    const { chats } = useSelector(state => state.chat);
    const {
        rcantidadedad,
        rcantidadarea,
        rcantidadrol,
        rcantidadpublicacionesusuarios,
        rcantidadpublicacionesfecha,
        rcantidadpublicacionescategoria,
        rcantidadeventosusuarios,
        rcantidadeventosfecha,
        rcantidadeventoscategoria,
        rcantidadgruposusuarios,
        rcantidadchatusuarios,
        rcantidadusuarioschat,
        cantidadcantidadusuarios,
        cantidadusuariosconectados
    } = useSelector(state => state.dashboard);
    console.log(cantidadcantidadusuarios);
    //FormValues

    const { opcionDashboard, fullscreen } = formValues;

    //OPT

    const OpcionDashboard = (valor) => {
        console.log(valor);
        if (valor == "Usuarios") {
            console.log(valor);
            setFormValues({
                ...formValues,
                opcionDashboard: "Usuarios"
            });
        }

        if (valor == "Publicaciones") {
            console.log(valor);
            setFormValues({
                ...formValues,
                opcionDashboard: "Publicaciones"
            });
        }

        if (valor == "Eventos") {
            console.log(valor);
            setFormValues({
                ...formValues,
                opcionDashboard: "Eventos"
            });
        }

        if (valor == "Chat") {
            console.log(valor);
            setFormValues({
                ...formValues,
                opcionDashboard: "Chat"
            });
        }

    }

    const Fullscreen = (valor) => {
        console.log(valor);
        if (valor == "Fullscreen") {
            console.log(valor);
            setFormValues({
                ...formValues,
                fullscreen: "Fullscreen"
            });
        }

        if (valor == "NoFullscreen") {
            console.log(valor);
            setFormValues({
                ...formValues,
                fullscreen: "NoFullscreen"
            });
        }
    }

    const handleInputChange = ({ target }) => {
        // dispatch(userFiltroEstado(target.value));
    }

    return (

        <div className="main__home">
            <div className="container__dashboard">
                <div className="dashboard">
                    <div className="header">
                        {(opcionDashboard == "Usuarios") ?
                            <div className="opt seleccionado">
                                <i class="fas fa-users"></i>
                            </div>
                            :
                            <div className="opt" onClick={() => { OpcionDashboard("Usuarios"); }}>
                                <i class="fas fa-users"></i>
                            </div>
                        }
                        {(opcionDashboard == "Publicaciones") ?
                            <div className="opt seleccionado">
                                Publicaciones
                            </div>
                            :
                            <div className="opt" onClick={() => { OpcionDashboard("Publicaciones"); }}>
                                Publicaciones
                            </div>
                        }
                        {(opcionDashboard == "Eventos") ?
                            <div className="opt seleccionado">
                                <i class="far fa-calendar-alt"></i>
                            </div>
                            :
                            <div className="opt" onClick={() => { OpcionDashboard("Eventos"); }}>
                                <i class="far fa-calendar-alt"></i>
                            </div>
                        }
                        {/* {(opcionDashboard == "Chat") ?
                            <div className="opt seleccionado">
                                <i class="fas fa-comments"></i>
                            </div>
                            :
                            <div className="opt" onClick={() => { OpcionDashboard("Chat"); }}>
                                <i class="fas fa-comments"></i>
                            </div>
                        } */}
                    </div>
                    <div className="body">
                        {(opcionDashboard == "Usuarios" && fullscreen == "NoFullscreen") ?
                            <div className="dcontenido">
                                <div className="dprimerarowcompleta">
                                    <div className="dapartado">
                                        <div className="dtitulo dtabla">
                                            <div className="opttabla">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button"
                                                    table="descargar-tabla-usuarios"
                                                    filename="TablaUsuarios"
                                                    sheet="Usuarios"
                                                    buttonText="XLS" />
                                            </div>
                                            <div className="opttabla">
                                                Tabla de usuarios
                                            </div>
                                            <div className="opttabla">
                                                {(fullscreen == "Fullscreen") ?
                                                    <i class="fas fa-compress" onClick={() => { Fullscreen("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Fullscreen("Fullscreen"); }}></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <table id="descargar-tabla-usuarios">

                                                <thead>
                                                    <tr>
                                                        <th scope="col">Imagen</th>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">A. Paterno</th>
                                                        <th scope="col">Edad</th>
                                                        <th scope="col">Fono</th>
                                                        <th scope="col">Rol</th>
                                                        <th scope="col">Area</th>

                                                        <th scope="col">Nacimiento</th>
                                                        <th scope="col">Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map(({ imgusuario, name, apellidoPaterno, apeliidoMaterno, edad, emailp, fono, rol, area, cargo, nacimiento, estado }, i) =>
                                                        <tr>
                                                            <td data-label="Account"><img src={imgusuario} height="30px" width='30px' style={{ borderRadius: '50%' }} /></td>
                                                            <td data-label="Due Date">{name}</td>
                                                            <td data-label="Amount">{apellidoPaterno}</td>
                                                            <td data-label="Account">{edad}</td>

                                                            <td data-label="Amount">{fono}</td>
                                                            <td data-label="Period">{rol}</td>
                                                            <td data-label="Account">{area}</td>

                                                            <td data-label="Amount">{moment(nacimiento).format("DD-MM-yy")}</td>
                                                            <td data-label="Period">{estado}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* <div className="dapartado">
                                        <div className="dtitulo">
                                            Usuarios por edad
                                        </div>
                                        <div className="dsubtitulo">
                                        </div>
                                        <div className="dinfo valores">
                                            <div className="dvalores dvsolo">
                                                <div className="dvtitulo">
                                                    Usuarios Totales
                                                </div>
                                                <div className="dvinfo">
                                                    {cantidadcantidadusuarios.lenght}
                                                </div>
                                            </div>
                                            <div className="dvalores ddiv">
                                                <div className="dvalores dvduo">
                                                    <div className="dvtitulo">
                                                        Usuarios Conectados
                                                    </div>
                                                    <div className="dvinfo">
                                                        {cantidadusuariosconectados}
                                                    </div>
                                                </div>
                                                <div className="dvalores dvduo">
                                                    <div className="dvtitulo">
                                                        Usuarios desconectados
                                                    </div>
                                                    <div className="dvinfo">
                                                        {cantidadcantidadusuarios - cantidadusuariosconectados}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="dsegundarow">
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Conexiones por edad
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadedad.map(({ _id, conexiones }, i) =>
                                                        [_id]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadedad.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]

                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,

                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Conexiones por area
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadarea.map(({ _id, conexiones }, i) =>
                                                        [
                                                            _id
                                                        ]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadarea.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]

                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,

                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Conexiones por rol
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadrol.map(({ _id, conexiones }, i) =>
                                                        [
                                                            _id
                                                        ]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadrol.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]

                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,

                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : (opcionDashboard == "Usuarios" && fullscreen == "Fullscreen") ?
                                <div className="dfcontenido">
                                    <div className="dapartado">
                                        <div className="dtitulo dtabla">
                                            <div className="opttabla">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button"
                                                    table="descargar-tabla-usuarios"
                                                    filename="TablaUsuarios"
                                                    sheet="Usuarios"
                                                    buttonText="XLS" />
                                            </div>
                                            <div className="opttabla">
                                                Tabla de usuarios
                                            </div>
                                            <div className="opttabla">
                                                {(fullscreen == "Fullscreen") ?
                                                    <i class="fas fa-compress" onClick={() => { Fullscreen("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Fullscreen("Fullscreen"); }}></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <table id="descargar-tabla-usuarios">

                                                <thead>
                                                    <tr>
                                                        <th scope="col">Imagen</th>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">A. Paterno</th>

                                                        <th scope="col">Edad</th>
                                                        <th scope="col">Fono</th>
                                                        <th scope="col">Rol</th>
                                                        <th scope="col">Area</th>
                                                        <th scope="col">Cargo</th>
                                                        <th scope="col">Nacimiento</th>
                                                        <th scope="col">Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map(({ imgusuario, name, apellidoPaterno, apeliidoMaterno, edad, emailp, fono, rol, area, cargo, nacimiento, estado }, i) =>
                                                        <tr>
                                                            <td data-label="Account"><img src={imgusuario} height="30px" width='30px' style={{ borderRadius: '50%' }} /></td>
                                                            <td data-label="Due Date">{name}</td>
                                                            <td data-label="Amount">{apellidoPaterno}</td>
                                                            <td data-label="Account">{edad}</td>

                                                            <td data-label="Amount">{fono}</td>
                                                            <td data-label="Period">{rol}</td>
                                                            <td data-label="Account">{area}</td>
                                                            <td data-label="Due Date">{cargo}</td>
                                                            <td data-label="Amount">{moment(nacimiento).format("DD-MM-yy")}</td>
                                                            <td data-label="Period">{estado}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                : ""
                        }

                        {(opcionDashboard == "Publicaciones" && fullscreen == "NoFullscreen") ?
                            <div className="dcontenido">
                                <div className="dprimerarowcompleta">
                                    <div className="dapartado">
                                        <div className="dtitulo dtabla">
                                            <div className="opttabla">
                                                <div className="opttabla">
                                                    <ReactHTMLTableToExcel
                                                        id="test-table-xls-button"
                                                        className="download-table-xls-button"
                                                        table="descargar-tabla-publicaciones"
                                                        filename="TablaPublicaciones"
                                                        sheet="Publicaciones"
                                                        buttonText="XLS" />
                                                </div>
                                            </div>
                                            <div className="opttabla">
                                                Tabla de publicaciones
                                            </div>
                                            <div className="opttabla">
                                                {(fullscreen == "Fullscreen") ?
                                                    <i class="fas fa-compress" onClick={() => { Fullscreen("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Fullscreen("Fullscreen"); }}></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <table id="descargar-tabla-publicaciones">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Titulo</th>

                                                        <th scope="col">Categoria</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {posts.map(({ titulo, id, contenido, categoria }, i) =>
                                                        <tr>
                                                            <td data-label="Account">{titulo}</td>

                                                            <td data-label="Amount">{categoria}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="dsegundarow">
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Publicaciones por usuario
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadpublicacionesusuarios.map(({ _id, conexiones }, i) =>
                                                        [
                                                            _id.name
                                                        ]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadpublicacionesusuarios.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]

                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,

                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Reacciones por publicación
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadpublicacionesfecha.map(({ _id, conexiones }, i) =>
                                                        [
                                                            _id
                                                        ]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadpublicacionesfecha.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]

                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,

                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Publicaciones por categoria
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadpublicacionescategoria.map(({ _id, conexiones }, i) =>
                                                        [
                                                            _id
                                                        ]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadpublicacionescategoria.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]

                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,

                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : (opcionDashboard == "Publicaciones" && fullscreen == "Fullscreen") ?
                                <div className="dfcontenido">
                                    <div className="dapartado">
                                        <div className="dtitulo dtabla">
                                            <div className="opttabla">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button"
                                                    table="descargar-tabla-publicaciones"
                                                    filename="TablaPublicaciones"
                                                    sheet="Publicaciones"
                                                    buttonText="XLS" />
                                            </div>
                                            <div className="opttabla">
                                                Tabla de usuarios
                                            </div>
                                            <div className="opttabla">
                                                {(fullscreen == "Fullscreen") ?
                                                    <i class="fas fa-compress" onClick={() => { Fullscreen("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Fullscreen("Fullscreen"); }}></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <table id="descargar-tabla-publicaciones">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Titulo</th>

                                                        <th scope="col">Categoria</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {posts.map(({ titulo, id, contenido, categoria }, i) =>
                                                        <tr>
                                                            <td data-label="Account">{titulo}</td>

                                                            <td data-label="Amount">{categoria}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                : ""

                        }

                        {(opcionDashboard == "Eventos" && fullscreen == "NoFullscreen") ?
                            <div className="dcontenido">
                                <div className="dprimerarowcompleta">
                                    <div className="dapartado">
                                        <div className="dtitulo dtabla">
                                            <div className="opttabla">
                                                <div className="opttabla">
                                                    <ReactHTMLTableToExcel
                                                        id="test-table-xls-button"
                                                        className="download-table-xls-button"
                                                        table="descargar-tabla-eventos"
                                                        filename="TablaEventos"
                                                        sheet="Eventos"
                                                        buttonText="XLS" />
                                                </div>
                                            </div>
                                            <div className="opttabla">
                                                Tabla de eventos
                                            </div>
                                            <div className="opttabla">
                                                {(fullscreen == "Fullscreen") ?
                                                    <i class="fas fa-compress" onClick={() => { Fullscreen("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Fullscreen("Fullscreen"); }}></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo ">
                                            <table id="descargar-tabla-eventos">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Titulo</th>
                                                        <th scope="col">descripcion</th>
                                                        <th scope="col">Inicio</th>
                                                        <th scope="col">Final</th>
                                                        <th scope="col">tipo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {events.map(({ titulo, id, descripcion, start, end, tipo }, i) =>
                                                        <tr>
                                                            <td data-label="Account">{titulo}</td>
                                                            <td data-label="Due Date">{descripcion}</td>
                                                            <td data-label="Amount">{moment(start).format("DD-MM-yy")}</td>
                                                            <td data-label="Period">{moment(end).format("DD-MM-yy")}</td>
                                                            <td data-label="Period">{tipo}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="dsegundarow">
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Eventos por usuario
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadeventosusuarios.map(({ _id, conexiones }, i) =>
                                                        [
                                                            _id.name
                                                        ]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadeventosusuarios.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]

                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,

                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Tipos de Eventos
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadeventosfecha.map(({ _id, conexiones }, i) =>
                                                        [
                                                            _id
                                                        ]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadeventosfecha.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]

                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,

                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Eventos por categoria
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadeventoscategoria.map(({ _id, conexiones }, i) =>
                                                        [
                                                            _id
                                                        ]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadeventoscategoria.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]

                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,

                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : (opcionDashboard == "Eventos" && fullscreen == "Fullscreen") ?
                                <div className="dfcontenido">
                                    <div className="dapartado">
                                        <div className="dtitulo dtabla">
                                            <div className="opttabla">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button"
                                                    table="descargar-tabla-eventos"
                                                    filename="TablaEventos"
                                                    sheet="Eventos"
                                                    buttonText="XLS" />
                                            </div>
                                            <div className="opttabla">
                                                Tabla de usuarios
                                            </div>
                                            <div className="opttabla">
                                                {(fullscreen == "Fullscreen") ?
                                                    <i class="fas fa-compress" onClick={() => { Fullscreen("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Fullscreen("Fullscreen"); }}></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <table id="descargar-tabla-eventos">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Titulo</th>
                                                        <th scope="col">descripcion</th>
                                                        <th scope="col">Inicio</th>
                                                        <th scope="col">Final</th>
                                                        <th scope="col">tipo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {events.map(({ titulo, id, descripcion, start, end, tipo }, i) =>
                                                        <tr>
                                                            <td data-label="Account">{titulo}</td>
                                                            <td data-label="Due Date">{descripcion}</td>
                                                            <td data-label="Amount">{moment(start).format("DD-MM-yy")}</td>
                                                            <td data-label="Period">{moment(end).format("DD-MM-yy")}</td>
                                                            <td data-label="Period">{tipo}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                : ""

                        }

                        {/* {(opcionDashboard == "Chat" && fullscreen == "NoFullscreen") ?
                            <div className="dcontenido">
                                <div className="dprimerarowcompleta">
                                    <div className="dapartado">
                                        <div className="dtitulo dtabla">
                                            <div className="opttabla">
                                            </div>
                                            <div className="opttabla">
                                                Tabla de chats
                                            </div>
                                            <div className="opttabla">
                                                {(fullscreen == "Fullscreen") ?
                                                    <i class="fas fa-compress" onClick={() => { Fullscreen("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Fullscreen("Fullscreen"); }}></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="dsubtitulo">
                                        </div>
                                        <div className="dinfo">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Account</th>
                                                        <th scope="col">Due Date</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Period</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {chats.map(({ titulo, id, descripcion, start, end, tipo }, i) =>
                                                        <tr>
                                                            <td data-label="Account">Visa - 3412</td>
                                                            <td data-label="Due Date">04/01/2016</td>
                                                            <td data-label="Amount">$1,190</td>
                                                            <td data-label="Period">03/01/2016 - 03/31/2016</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="dsegundarow">
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Chats grupales por usuario
                                        </div>
                                        <div className="dsubtitulo">
                                            <select class="form-control" onChange={handleInputChange} name="estado" id="exampleFormControlSelect2">
                                                <option defaultValue>Seleccione un estado...</option>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </select>
                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadgruposusuarios.map(({ _id, conexiones }, i) =>
                                                        [
                                                            _id
                                                        ]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadgruposusuarios.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]
                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,
                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Canales por usuario
                                        </div>
                                        <div className="dsubtitulo">
                                            <select class="form-control" onChange={handleInputChange} name="estado" id="exampleFormControlSelect2">
                                                <option defaultValue>Seleccione un estado...</option>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </select>
                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadchatusuarios.map(({ _id, conexiones }, i) =>
                                                        [
                                                            _id
                                                        ]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadchatusuarios.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]
                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,
                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="dapartado">
                                        <div className="dtitulo">
                                            Chats por usuario
                                        </div>
                                        <div className="dsubtitulo">
                                            <select class="form-control" onChange={handleInputChange} name="estado" id="exampleFormControlSelect2">
                                                <option defaultValue>Seleccione un estado...</option>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </select>
                                        </div>
                                        <div className="dinfo">
                                            <Pie
                                                data={{
                                                    labels: rcantidadusuarioschat.map(({ _id, conexiones }, i) =>
                                                        [
                                                            _id.name
                                                        ]
                                                    ),
                                                    datasets: [{
                                                        label: 'Conexiones',
                                                        data: rcantidadusuarioschat.map(({ _id, conexiones }, i) =>
                                                            [
                                                                conexiones
                                                            ]
                                                        ),
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.2)',
                                                            'rgba(54, 162, 235, 0.2)',
                                                            'rgba(255, 206, 86, 0.2)',
                                                            'rgba(75, 192, 192, 0.2)',
                                                            'rgba(153, 102, 255, 0.2)',
                                                            'rgba(255, 159, 64, 0.2)',
                                                        ],
                                                        borderColor: [
                                                            'rgba(255, 99, 132, 1)',
                                                            'rgba(54, 162, 235, 1)',
                                                            'rgba(255, 206, 86, 1)',
                                                            'rgba(75, 192, 192, 1)',
                                                            'rgba(153, 102, 255, 1)',
                                                            'rgba(255, 159, 64, 1)',
                                                        ],
                                                    }]
                                                }}
                                                options={{
                                                    layout: {
                                                        padding: 8,
                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : (opcionDashboard == "Chat" && fullscreen == "Fullscreen") ?
                                <div className="dfcontenido">
                                    <div className="dapartado">
                                        <div className="dtitulo dtabla">
                                            <div className="opttabla">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button"
                                                    table="descargar-tabla-usuarios"
                                                    filename="TablaUsuarios"
                                                    sheet="Usuarios"
                                                    buttonText="" />
                                            </div>
                                            <div className="opttabla">
                                                Tabla de usuarios
                                            </div>
                                            <div className="opttabla">
                                                {(fullscreen == "Fullscreen") ?
                                                    <i class="fas fa-compress" onClick={() => { Fullscreen("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Fullscreen("Fullscreen"); }}></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="dsubtitulo">
                                        </div>
                                        <div className="dinfo">
                                            <table id="descargar-tabla-usuarios">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Account</th>
                                                        <th scope="col">Due Date</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Period</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {chats.map(({ titulo, id, descripcion, start, end, tipo }, i) =>
                                                        <tr>
                                                            <td data-label="Account">Visa - 3412</td>
                                                            <td data-label="Due Date">04/01/2016</td>
                                                            <td data-label="Amount">$1,190</td>
                                                            <td data-label="Period">03/01/2016 - 03/31/2016</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                : ""
                        } */}
                    </div>
                </div>
            </div>
        </div>

    )
}