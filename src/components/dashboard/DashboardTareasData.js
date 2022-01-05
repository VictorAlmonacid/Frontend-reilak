import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { valoresCantidadTareas, valoresCantidadTareasAtrasadas, valoresCantidadTareasCompletadas, valoresCantidadTareasProceso } from '../../actions/dashboard';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment';
import DataTable from 'react-data-table-component';

const initEvent = {
    //Opciones
    fullscreen: 'Tabla',
}

export const DashboardTareasCreadas = () => {

    //UseDispatch
    const dispatch = useDispatch();

    //UseEffect
    useEffect(() => {
        dispatch(valoresCantidadTareas());
    }, [dispatch])

    const [formValues, setFormValues] = useState(initEvent);
    const { fullscreen } = formValues;
    //UseSelector
    const {
        dashboardcantidadtareas,
    } = useSelector(state => state.dashboard);

    const VolverTablas = () => {

        setFormValues({
            ...formValues,
            fullscreen: "Datos",
        });
    }

    return (

        <div className="dapartado">
            <div className="dtitulo dtabla">
                <div className="opttabla">
                    {/* <i class="fas fa-arrow-left" onClick={() => { VolverTablas(); }}></i> */}
                </div>
                <div className="opttabla">
                    Tabla de tareas
                </div>
                <div className="opttabla">
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="descargar-tabla-usuarios"
                        filename="TablaUsuarios"
                        sheet="Usuarios"
                        buttonText="XLS" />
                </div>
            </div>

            <div
                className="dsubtitulo"

            >

            </div>

            <div className="dinfo">
                <table id="descargar-tabla-usuarios">
                    <thead>
                        <tr>
                            <th scope="col">Titulo</th>
                            <th scope="col">Contenido</th>
                            <th scope="col">Fecha creacion</th>
                            <th scope="col">Fecha termino</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardcantidadtareas.map((user, i) =>
                            <tr>
                                <td data-label="Account">{user.titulo}</td>
                                <td data-label="Due Date">{user.contenido}</td>
                                <td data-label="Amount">{moment(user.fechaCreacion).format("DD-MM-yy")}</td>
                                <td data-label="Amount">{moment(user.fechaTermino).format("DD-MM-yy")}</td>
                                <td data-label="Amount">{user.name}</td>
                                <td data-label="Amount">{user.apellidoPaterno}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const DashboardTareasEnProceso = () => {

    //UseDispatch
    const dispatch = useDispatch();

    //UseEffect
    useEffect(() => {
        dispatch(valoresCantidadTareasProceso());
    }, [dispatch])

    const [formValues, setFormValues] = useState(initEvent);
    const { fullscreen } = formValues;
    //UseSelector
    const {
        dashboardcantidadtareasproceso
    } = useSelector(state => state.dashboard);

    const VolverTablas = (valor) => {

        setFormValues({
            ...formValues,
            fullscreen: "Tablas",
            optchat: valor
        });
    }

    return (

        <div className="dapartado">
            <div className="dtitulo dtabla">
                <div className="opttabla">
                    {/* <i class="fas fa-arrow-left"></i> */}
                </div>
                <div className="opttabla">
                    Tabla de tareas en proceso
                </div>
                <div className="opttabla">
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="descargar-tabla-usuarios"
                        filename="TablaUsuarios"
                        sheet="Usuarios"
                        buttonText="XLS" />
                </div>
            </div>

            <div
                className="dsubtitulo"

            >

            </div>

            <div className="dinfo">
                <table id="descargar-tabla-usuarios">
                    <thead>
                        <tr>
                            <th scope="col">Titulo</th>
                            <th scope="col">Contenido</th>
                            <th scope="col">Fecha creacion</th>
                            <th scope="col">Fecha termino</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardcantidadtareasproceso.map((user, i) =>
                            <tr>
                                <td data-label="Account">{user.titulo}</td>
                                <td data-label="Due Date">{user.contenido}</td>
                                <td data-label="Amount">{moment(user.fechaCreacion).format("DD-MM-yy")}</td>
                                <td data-label="Amount">{moment(user.fechaTermino).format("DD-MM-yy")}</td>
                                <td data-label="Amount">{user.name}</td>
                                <td data-label="Amount">{user.apellidoPaterno}</td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const DashboardTareasAtrasadas = () => {

    //UseDispatch
    const dispatch = useDispatch();

    //UseEffect
    useEffect(() => {
        dispatch(valoresCantidadTareasAtrasadas());
    }, [dispatch])

    const [formValues, setFormValues] = useState(initEvent);
    const { fullscreen } = formValues;
    //UseSelector
    const {
        dashboardcantidadtareasatrasadas,
        dashboardcantidadtareascompletadas
    } = useSelector(state => state.dashboard);

    const VolverTablas = (valor) => {

        setFormValues({
            ...formValues,
            fullscreen: "Tablas",
            optchat: valor
        });
    }

    return (

        <div className="dapartado">
            <div className="dtitulo dtabla">
                <div className="opttabla">
                    {/* <i class="fas fa-arrow-left"></i> */}
                </div>
                <div className="opttabla">
                    Tabla de tareas atrasadas
                </div>
                <div className="opttabla">
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="descargar-tabla-usuarios"
                        filename="TablaUsuarios"
                        sheet="Usuarios"
                        buttonText="XLS" />
                </div>
            </div>

            <div
                className="dsubtitulo"

            >

            </div>

            <div className="dinfo">
                <table id="descargar-tabla-usuarios">
                    <thead>
                        <tr>
                            <th scope="col">Titulo</th>
                            <th scope="col">Contenido</th>
                            <th scope="col">Fecha creacion</th>
                            <th scope="col">Fecha termino</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardcantidadtareasatrasadas.map((user, i) =>
                            <tr>
                                <td data-label="Account">{user.titulo}</td>
                                <td data-label="Due Date">{user.contenido}</td>
                                <td data-label="Amount">{moment(user.fechaCreacion).format("DD-MM-yy")}</td>
                                <td data-label="Amount">{moment(user.fechaTermino).format("DD-MM-yy")}</td>
                                <td data-label="Amount">{user.name}</td>
                                <td data-label="Amount">{user.apellidoPaterno}</td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const DashboardTareasCompletadas = () => {

    //UseDispatch
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initEvent);
    const { fullscreen } = formValues;
    //UseEffect
    useEffect(() => {
        dispatch(valoresCantidadTareasCompletadas());
    }, [dispatch])


    //UseSelector
    const {
        dashboardcantidadtareascompletadas
    } = useSelector(state => state.dashboard);


    const columns = [
        {
            name: 'Titulo',
            selector: row => row.Titulo,
        },
        {
            name: 'Contenido',
            selector: row => row.contenido,
        },
        {
            name: 'Fecha creacion',
            selector: row => row.fechaCreacion,
        },
        {
            name: 'Fecha termino',
            selector: row => row.fechaTermino,
        },
        {
            name: 'usuario',
            selector: row => row.usuario,
        },
        {
            name: 'estado',
            selector: row => row.estado,
        },
    ];

    const VolverTablas = (valor) => {

        setFormValues({
            ...formValues,
            fullscreen: "Tablas",
            optchat: valor
        });
    }

    return (

        <div className="dapartado">
            <div className="dtitulo dtabla">
                <div className="opttabla">
                    {/* <i class="fas fa-arrow-left"></i> */}
                </div>
                <div className="opttabla">
                    Tabla de tareas completadas
                </div>
                <div className="opttabla">
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="descargar-tabla-usuarios"
                        filename="TablaUsuarios"
                        sheet="Usuarios"
                        buttonText="XLS" />
                </div>
            </div>

            <div
                className="dsubtitulo"

            >

            </div>

            <div className="dinfo">
                {/* <DataTable
                    columns={columns}
                    data={dashboardcantidadtareascompletadas}
                /> */}
                <table id="descargar-tabla-usuarios">
                    <thead>
                        <tr>
                            <th scope="col">Titulo</th>
                            <th scope="col">Contenido</th>
                            <th scope="col">Fecha creacion</th>
                            <th scope="col">Fecha termino</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardcantidadtareascompletadas.map((user, i) =>
                            <tr>
                                <td data-label="Account">{user.titulo}</td>
                                <td data-label="Due Date">{user.contenido}</td>
                                <td data-label="Amount">{moment(user.fechaCreacion).format("DD-MM-yy")}</td>
                                <td data-label="Amount">{moment(user.fechaTermino).format("DD-MM-yy")}</td>
                                <td data-label="Amount">{user.name}</td>
                                <td data-label="Amount">{user.apellidoPaterno}</td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>
        </div>
    )
}