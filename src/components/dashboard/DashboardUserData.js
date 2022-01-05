import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import {
    totaLCantidadTiempoConexion,
    totaLTiempoConexion
} from "../../actions/dashboard";
import {
    dashboardRadioEventoFecha,
    dashboardRadioPublicacionesFecha
} from "../../actions/dashboardRadios";
import { eventsStartLoading } from "../../actions/eventos";
import { postStartLoading } from "../../actions/post";

const initEvent = {
    //Opciones
    cantidadpublicaciones: 0,
}

export const DashboardUserData = () => {

    //UseDispatch
    const dispatch = useDispatch();

    //UseState
    const [formValues, setFormValues] = useState(initEvent);

    //UseEffect
    useEffect(() => {
        dispatch(totaLTiempoConexion());
        dispatch(dashboardRadioPublicacionesFecha());
        dispatch(dashboardRadioEventoFecha());
        dispatch(eventsStartLoading());
        dispatch(postStartLoading());
        // dispatch(totaLCantidadTiempoConexion());
    }, [dispatch])

    const { cantidadpublicaciones } = formValues;

    //UseSelector
    const {
        rcantidadpublicacionesusuarios,
        rcantidadeventosusuarios,
        tiempototalconexion,
        // tiempocantidadtotalconexion
    } = useSelector(state => state.dashboard);

    const { posts } = useSelector(state => state.post);
    const { events } = useSelector(state => state.events);


    const { activeUser } = useSelector(state => state.users);


    const handleMilliToMinutes = (valor) => {
        var tempTime = moment.duration(valor);
        var y = tempTime.hours() + ":" + tempTime.minutes();
        // setFormValues({
        //     ...formValues,
        //     cantidadpublicaciones: y
        // });
        return y;
    }

    const handleSumaMinutes = (valor) => {
        var tempTime = moment.duration(valor);
        var x = tempTime.hours() + ":" + tempTime.minutes();
        return x;
    }

    return (
        <div className="duapartado">
            <div class="titulo">
                Valores Generales
            </div>
            <div class="datos">
                <div class="cubo">
                    <div class="cubotitulo">
                        <div class="cubotitulo-sub">

                        </div>
                        <div class="cubotitulo-sub">
                            Tiempo total de conexion
                        </div>
                        <div class="cubotitulo-sub">
                            {/* <i class="fas fa-eye" onClick={() => { DatosTablasChats("TodosChat"); }}></i> */}
                        </div>
                    </div>
                    <div class="valoresgeneralessolo tamanoletra">
                        {tiempototalconexion.map(({ _id, tiempo }, i) => (_id == activeUser.id) ?
                            handleMilliToMinutes(tiempo)
                            :
                            ""
                        )}

                    </div>
                </div>
                <div class="cubo">
                    <div class="cubotitulo">
                        <div class="cubotitulo-sub">

                        </div>
                        <div class="cubotitulo-sub">
                            Publicaciones
                        </div>
                        <div class="cubotitulo-sub">
                            {/* <i class="fas fa-eye" onClick={() => { DatosTablasChats("TodosChat"); }}></i> */}
                        </div>
                    </div>
                    <div class="valoresgenerales">
                        <div class="valoresgeneralessolo">
                            {rcantidadpublicacionesusuarios.map(({ _id, conexiones }, i) => (_id._id == activeUser.id) ?
                                ((conexiones / posts.length) * 100).toFixed(1) + "%"
                                :
                                ""
                            )}
                        </div>
                        <div class="valoresgeneralesduo">
                            <div class="valoresgeneralestres">
                                {rcantidadpublicacionesusuarios.map(({ _id, conexiones }, i) => (_id._id == activeUser.id) ?
                                    conexiones
                                    :
                                    ""
                                )}
                            </div>
                            <div class="valoresgeneralestres">
                                {posts.length}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cubo">
                    <div class="cubotitulo">
                        <div class="cubotitulo-sub">

                        </div>
                        <div class="cubotitulo-sub">
                            Eventos
                        </div>
                        <div class="cubotitulo-sub">
                            {/* <i class="fas fa-eye" onClick={() => { DatosTablasChats("TodosChat"); }}></i> */}
                        </div>
                    </div>
                    <div class="valoresgenerales">
                        <div class="valoresgeneralessolo">
                            {rcantidadeventosusuarios.map(({ _id, conexiones }, i) => (_id._id == activeUser.id) ?
                                ((conexiones / events.length) * 100).toFixed(1) + "%"
                                :
                                ""
                            )}
                        </div>
                        <div class="valoresgeneralesduo">
                            <div class="valoresgeneralestres">
                                {rcantidadeventosusuarios.map(({ _id, conexiones }, i) => (_id._id == activeUser.id) ?
                                    conexiones
                                    :
                                    ""
                                )}
                            </div>
                            <div class="valoresgeneralestres">
                                {events.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}