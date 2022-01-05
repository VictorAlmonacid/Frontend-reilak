import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from 'react-data-table-component';
//DATE
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Swal from 'sweetalert2';
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
    dashboardUsuariosConectados,

} from "../../actions/dashboardRadios";
import {
    totaLTiempoConexion,
    valoresCantidadChats,
    valoresCantidadChatsCanal,
    valoresCantidadChatsGrupal,
    valoresCantidadChatsPersonal,
    valoresCantidadTareas,
    valoresCantidadTareasAtrasadas,
    valoresCantidadTareasCompletadas,
    valoresCantidadTareasProceso
} from "../../actions/dashboard";

import { userStartLoading, userSetActive } from "../../actions/usuarios";
import { postStartLoading } from "../../actions/post";
import { DashboardUserData } from "./DashboardUserData";
import { tareasStartLoading } from "../../actions/tarea";
import { DashboardTareasAtrasadas, DashboardTareasCompletadas, DashboardTareasCreadas, DashboardTareasData, DashboardTareasEnProceso } from "./DashboardTareasData";
import { DashboardChatsCanal, DashboardChatsCreados, DashboardChatsGrupal, DashboardChatsPersonal } from "./DashboardChatData";

//CALENDARIO
const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

//InitEvents
const initEvent = {
    //Opciones
    opcionTablas: 'Publicaciones',
    opcionDashboard: 'Usuarios',
    tabla: '',
    fullscreen: 'Tabla',
    start: now.toDate(),
    end: nowPlus1.toDate(),
    tareasatrasadas: 0,
    opttarea: "",
    optchat: "",
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
        dispatch(totaLTiempoConexion());
        dispatch(tareasStartLoading());
        dispatch(valoresCantidadChats());
        dispatch(valoresCantidadChatsPersonal());
        dispatch(valoresCantidadChatsGrupal());
        dispatch(valoresCantidadChatsCanal());
        dispatch(valoresCantidadTareas());
        dispatch(valoresCantidadTareasProceso());
        dispatch(valoresCantidadTareasAtrasadas());
        dispatch(valoresCantidadTareasCompletadas());
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
        cantidadusuariosconectados,
        tiempototalconexion,
        dashboardcantidadchats,
        dashboardcantidadchatspersonal,
        dashboardcantidadchatsgrupal,
        dashboardcantidadchatscanal,
        dashboardcantidadtareas,
        dashboardcantidadtareasproceso,
        dashboardcantidadtareasatrasadas,
        dashboardcantidadtareascompletadas,
    } = useSelector(state => state.dashboard);
    //FormValues
    const { opcionDashboard, fullscreen, start, end, tareasatrasadas, opttarea, optchat } = formValues;

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }

        const fechas =
        {
            fechaInicio: formValues.start,
            fechaTermino: formValues.end
        };
        dispatch(totaLTiempoConexion(fechas));
    }

    //OPT

    const OpcionDashboard = (valor) => {

        if (valor == "Usuarios") {

            setFormValues({
                ...formValues,
                opcionDashboard: "Usuarios",
                fullscreen: "Tabla"
            });
        }

        if (valor == "Publicaciones") {

            setFormValues({
                ...formValues,
                opcionDashboard: "Publicaciones",
                fullscreen: "Tabla"
            });
        }

        if (valor == "Eventos") {

            setFormValues({
                ...formValues,
                opcionDashboard: "Eventos",
                fullscreen: "Tabla"
            });
        }

        if (valor == "Chats") {

            setFormValues({
                ...formValues,
                opcionDashboard: "Chats",
                fullscreen: "Tabla"
            });
        }

        if (valor == "Tareas") {

            setFormValues({
                ...formValues,
                opcionDashboard: "Tareas",
                fullscreen: "Tabla"
            });
        }

    }

    const Datos = (valor, usuario) => {
        if (valor == "Tabla") {
            setFormValues({
                ...formValues,
                fullscreen: "Tabla"
            });
        }

        if (valor == "Datos") {

            dispatch(userSetActive(usuario));

            setFormValues({
                ...formValues,
                fullscreen: "Datos"
            });
        }
    }

    const DatosTareasAtrasadas = (valor) => {

        setFormValues({
            ...formValues,
            fullscreen: "Datos",
            opttarea: valor
        });
    }

    const DatosTablasChats = (valor) => {

        setFormValues({
            ...formValues,
            fullscreen: "Datos",
            optchat: valor
        });
    }

    // const CantidadTareasAtrasadas = () => {
    //     setFormValues({
    //         ...formValues,
    //         tareasatrasadas: tareasatrasadas + 1
    //     });
    //     return tareasatrasadas;
    // }



    const handleMilliToMinutes = (valor) => {
        var tempTime = moment.duration(valor);
        var y = tempTime.hours() + ":" + tempTime.minutes();
        return y;
    }

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleChatPersonal = () => {
        const numbers = 0;

        dashboardcantidadchats.forEach((tipo = "personal") => numbers = numbers + 1);

        return numbers
    }

    const columns = [
        {
            name: 'Imagen',
            selector: row => row.imagen,
        },
        {
            name: 'Rut',
            selector: row => row.rut,
        },
        {
            name: 'Publicaciones',
            selector: row => row.publicaciones,
        },
        {
            name: 'Eventos',
            selector: row => row.eventos,
        },
        {
            name: 'TTC',
            selector: row => row.ttc,
        },
        {
            name: 'Info',
            selector: row => row.year,
        },
    ];

    const data = users.map((user, i) => [
        {
            imagen: 'Beetlejuice',
            rut: user.rut,
            publicaciones: 'Beetlejuice',
            eventos: '1988',
            ttc: 'Beetlejuice',
            year: '1988',
        }
    ])

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
                                <i class="fas fa-newspaper"></i>
                            </div>
                            :
                            <div className="opt" onClick={() => { OpcionDashboard("Publicaciones"); }}>
                                <i class="fas fa-newspaper"></i>
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
                        {(opcionDashboard == "Chats") ?
                            <div className="opt seleccionado">
                                <i class="fas fa-comments"></i>
                            </div>
                            :
                            <div className="opt" onClick={() => { OpcionDashboard("Chats"); }}>
                                <i class="fas fa-comments"></i>
                            </div>
                        }
                        {(opcionDashboard == "Tareas") ?
                            <div className="opt seleccionado">
                                <i class="fas fa-clipboard-list"></i>
                            </div>
                            :
                            <div className="opt" onClick={() => { OpcionDashboard("Tareas") }}>
                                <i class="fas fa-clipboard-list"></i>
                            </div>
                        }
                    </div>
                    <div className="body">
                        {(opcionDashboard == "Usuarios" && fullscreen == "Datos") ?
                            <div className="dfcontenido">

                                <DashboardUserData />

                            </div>
                            : (opcionDashboard == "Usuarios" && fullscreen == "Tabla") ?
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

                                            </div>
                                        </div>

                                        <form
                                            className="dsubtitulo"
                                            onSubmit={handleSubmitForm}
                                        >
                                            {/* <div className="dsapartado">
                                                Fecha inicio
                                            </div>
                                            <div className="dsapartado">
                                                <DateTimePicker
                                                    onChange={handleStartDateChange}
                                                    value={dateStart}
                                                    className="input-eventos-ysm"
                                                />
                                            </div>
                                            <div className="dsapartado">
                                                Fecha final
                                            </div>
                                            <div className="dsapartado">
                                                <DateTimePicker
                                                    onChange={handleEndDateChange}
                                                    value={dateEnd}
                                                    minDate={dateStart}
                                                    className="input-eventos-ysm"
                                                />
                                            </div>
                                            <div className="dsapartado">
                                                <button type="submit" className="birthday__modal-btn">
                                                    Filtrar
                                                </button>
                                            </div> */}
                                        </form>

                                        <div className="dinfo">
                                            {/* <DataTable
                                                columns={columns}
                                                data={users.map(({ rut }, i) => [{
                                                    imagen: 'Beetlejuice',
                                                    rut: rut,
                                                    publicaciones: 'Beetlejuice',
                                                    eventos: '1988',
                                                    ttc: 'Beetlejuice',
                                                    year: '1988',
                                                }])}
                                            /> */}
                                            <table id="descargar-tabla-usuarios">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Imagen</th>
                                                        <th scope="col">Rut</th>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Apellido</th>
                                                        <th scope="col">Publicaciones</th>
                                                        <th scope="col">Eventos</th>
                                                        <th scope="col">Tiempo total de conexion</th>
                                                        <th scope="col">Info</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map((user, i) =>
                                                        <tr>
                                                            <td data-label="Account"><img src={user.imgusuario} height="30px" width='30px' style={{ borderRadius: '50%' }} /></td>
                                                            <td data-label="Due Date">{user.rut}</td>
                                                            <td data-label="Due Date">{user.name}</td>
                                                            <td data-label="Due Date">{user.apellidoPaterno}</td>
                                                            <td data-label="Amount">{rcantidadpublicacionesusuarios.map(({ _id, conexiones }, i) => (_id._id == user.id) ?
                                                                conexiones
                                                                :
                                                                ""
                                                            )}</td>
                                                            <td data-label="Amount">{rcantidadeventosusuarios.map(({ _id, conexiones }, i) => (_id._id == user.id) ?
                                                                conexiones
                                                                :
                                                                ""
                                                            )}</td>
                                                            <td data-label="Amount">{tiempototalconexion.map(({ _id, tiempo }, i) => (_id == user.id) ?
                                                                handleMilliToMinutes(tiempo)
                                                                :
                                                                ""
                                                            )}</td>
                                                            <td data-label="Period"><i class="fas fa-info" onClick={() => { Datos("Datos", user); }}></i></td>

                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                : ""
                        }

                        {(opcionDashboard == "Publicaciones" && fullscreen == "Tabla") ?
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
                                                    <i class="fas fa-compress" onClick={() => { Datos("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Datos("Fullscreen"); }}></i>
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
                                        {/* <div className="dtitulo">
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
                                        </div> */}
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
                            : (opcionDashboard == "Publicaciones" && fullscreen == "Datos") ?
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
                                                    <i class="fas fa-compress" onClick={() => { Datos("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Datos("Fullscreen"); }}></i>
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

                        {(opcionDashboard == "Eventos" && fullscreen == "Tabla") ?
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
                                                    <i class="fas fa-compress" onClick={() => { Datos("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Datos("Fullscreen"); }}></i>
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
                            : (opcionDashboard == "Eventos" && fullscreen == "Tabla") ?
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
                                                    <i class="fas fa-compress" onClick={() => { Datos("NoFullscreen"); }}></i>
                                                    :
                                                    <i class="fas fa-expand 4x" onClick={() => { Datos("Fullscreen"); }}></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="dsubtitulo">

                                        </div>
                                        <div className="dinfo">
                                            <table id="descargar-tabla-eventos">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Imagen</th>
                                                        <th scope="col">Rut</th>
                                                        <th scope="col">Publicaciones</th>
                                                        <th scope="col">Eventos</th>
                                                        <th scope="col">Chats</th>
                                                        <th scope="col">TTC</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {events.map(({ titulo, id, descripcion, start, end, tipo }, i) =>
                                                        <tr>
                                                            <td data-label="Account">{titulo}</td>
                                                            <td data-label="Due Date">{descripcion}</td>
                                                            <td data-label="Amount">{moment(start).format("DD-MM-yy")}</td>
                                                            <td data-label="Period">{moment(end).format("DD-MM-yy")}</td>
                                                            <td data-label="Period">{tipo}</td>
                                                        </tr>
                                                    )} */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                :

                                (opcionDashboard == "Chats" && fullscreen == "Datos" && optchat == "TodosChat") ?
                                    <div className="dfcontenido">

                                        <DashboardChatsCreados />

                                    </div>
                                    : (opcionDashboard == "Chats" && fullscreen == "Datos" && optchat == "ChatPersonal") ?
                                        <div className="dfcontenido">

                                            <DashboardChatsPersonal />

                                        </div>
                                        : (opcionDashboard == "Chats" && fullscreen == "Datos" && optchat == "ChatGrupal") ?
                                            <div className="dfcontenido">

                                                <DashboardChatsGrupal />

                                            </div>
                                            : (opcionDashboard == "Chats" && fullscreen == "Datos" && optchat == "ChatCanal") ?
                                                <div className="dfcontenido">

                                                    <DashboardChatsCanal />

                                                </div>
                                                :
                                                (opcionDashboard == "Chats" && fullscreen == "Tabla") ?
                                                    <div className="duapartado">
                                                        <div class="datos">
                                                            <div class="cubo">
                                                                <div class="cubotitulo">
                                                                    <div class="cubotitulo-sub">

                                                                    </div>
                                                                    <div class="cubotitulo-sub">
                                                                        Chats creados
                                                                    </div>
                                                                    <div class="cubotitulo-sub">
                                                                        {/* <i class="fas fa-eye" onClick={() => { DatosTablasChats("TodosChat"); }}></i> */}
                                                                    </div>
                                                                </div>
                                                                <div class="valoresgeneralessolo tamanoletra">
                                                                    {dashboardcantidadchats.length}
                                                                </div>
                                                            </div>
                                                            <div class="cubo">
                                                                <div class="cubotitulo">
                                                                    <div class="cubotitulo-sub">

                                                                    </div>
                                                                    <div class="cubotitulo-sub">
                                                                        Chats individuales
                                                                    </div>
                                                                    <div class="cubotitulo-sub">
                                                                        {/* <i class="fas fa-eye" onClick={() => { DatosTablasChats("ChatPersonal"); }}></i> */}
                                                                    </div>
                                                                </div>
                                                                <div class="valoresgeneralessolo tamanoletra">
                                                                    {dashboardcantidadchatspersonal.length}
                                                                </div>
                                                            </div>
                                                            <div class="cubo">
                                                                <div class="cubotitulo">
                                                                    <div class="cubotitulo-sub">

                                                                    </div>
                                                                    <div class="cubotitulo-sub">
                                                                        Chats grupales
                                                                    </div>
                                                                    <div class="cubotitulo-sub">
                                                                        {/* <i class="fas fa-eye" onClick={() => { DatosTablasChats("ChatGrupal"); }}></i> */}
                                                                    </div>
                                                                </div>
                                                                <div class="valoresgeneralessolo tamanoletra">
                                                                    {dashboardcantidadchatsgrupal.length}
                                                                </div>
                                                            </div>
                                                            <div class="cubo">
                                                                <div class="cubotitulo">
                                                                    <div class="cubotitulo-sub">

                                                                    </div>
                                                                    <div class="cubotitulo-sub">
                                                                        Canales
                                                                    </div>
                                                                    <div class="cubotitulo-sub">
                                                                        {/* <i class="fas fa-eye" onClick={() => { DatosTablasChats("ChatCanal"); }}></i> */}
                                                                    </div>
                                                                </div>
                                                                <div class="valoresgeneralessolo tamanoletra">
                                                                    {dashboardcantidadchatscanal.length}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    (opcionDashboard == "Tareas" && fullscreen == "Datos" && opttarea == "TodasTareas") ?
                                                        <div className="dfcontenido">

                                                            <DashboardTareasCreadas />

                                                        </div>
                                                        : (opcionDashboard == "Tareas" && fullscreen == "Datos" && opttarea == "EnProceso") ?
                                                            <div className="dfcontenido">

                                                                <DashboardTareasEnProceso />

                                                            </div>
                                                            : (opcionDashboard == "Tareas" && fullscreen == "Datos" && opttarea == "Atrasadas") ?
                                                                <div className="dfcontenido">

                                                                    <DashboardTareasAtrasadas />

                                                                </div>
                                                                : (opcionDashboard == "Tareas" && fullscreen == "Datos" && opttarea == "Completadas") ?
                                                                    <div className="dfcontenido">

                                                                        <DashboardTareasCompletadas />

                                                                    </div>
                                                                    :
                                                                    (opcionDashboard == "Tareas" && fullscreen == "Tabla") ?
                                                                        <div className="duapartado">
                                                                            <div class="datos">
                                                                                <div class="cubo">
                                                                                    <div class="cubotitulo">
                                                                                        <div class="cubotitulo-sub">

                                                                                        </div>
                                                                                        <div class="cubotitulo-sub">
                                                                                            Tareas creadas
                                                                                        </div>
                                                                                        <div class="cubotitulo-sub">
                                                                                            <i class="fas fa-eye" onClick={() => { DatosTareasAtrasadas("TodasTareas"); }}></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="valoresgeneralessolo tamanoletra">
                                                                                        {dashboardcantidadtareas.length}
                                                                                    </div>
                                                                                </div>
                                                                                <div class="cubo">
                                                                                    <div class="cubotitulo">
                                                                                        <div class="cubotitulo-sub">

                                                                                        </div>
                                                                                        <div class="cubotitulo-sub">
                                                                                            Tareas en proceso
                                                                                        </div>
                                                                                        <div class="cubotitulo-sub">
                                                                                            <i class="fas fa-eye" onClick={() => { DatosTareasAtrasadas("EnProceso"); }}></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="valoresgeneralessolo tamanoletra">
                                                                                        {dashboardcantidadtareasproceso.length}
                                                                                    </div>
                                                                                </div>
                                                                                <div class="cubo">
                                                                                    <div class="cubotitulo">
                                                                                        <div class="cubotitulo-sub">

                                                                                        </div>
                                                                                        <div class="cubotitulo-sub">
                                                                                            Tareas atrasadas
                                                                                        </div>
                                                                                        <div class="cubotitulo-sub">
                                                                                            <i class="fas fa-eye" onClick={() => { DatosTareasAtrasadas("Atrasadas"); }}></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="valoresgeneralessolo tamanoletra">
                                                                                        {dashboardcantidadtareasatrasadas.length}
                                                                                    </div>
                                                                                </div>
                                                                                <div class="cubo">
                                                                                    <div class="cubotitulo">
                                                                                        <div class="cubotitulo-sub">

                                                                                        </div>
                                                                                        <div class="cubotitulo-sub ">
                                                                                            Tareas completas
                                                                                        </div>
                                                                                        <div class="cubotitulo-sub ">
                                                                                            <i class="fas fa-eye" onClick={() => { DatosTareasAtrasadas("Completadas"); }}></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="valoresgeneralessolo tamanoletra">
                                                                                        {dashboardcantidadtareascompletadas.length}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        : ""

                        }
                    </div>
                </div>
            </div>
        </div>

    )
}