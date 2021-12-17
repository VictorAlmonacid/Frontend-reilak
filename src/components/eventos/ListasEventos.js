import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import moment from 'moment';

import {
    eventsStartLoading,
    eventsStartDelete, 
    eventsSetActive 
} from "../../actions/eventos";

//LISTAR EVENTOS

export const ListaDeEventos = () => {
    //Handles
    const eliminarEvento = (id) => {
        dispatch(eventsStartDelete(id));
    };

    const editarUsuario = (titulo, id, descripcion, start, end, tipo) => {

        const prueba = { titulo, id, descripcion, start, end, tipo };
        console.log("prueba",prueba)
        dispatch(eventsSetActive(prueba));
    };
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(eventsStartLoading());

    }, [dispatch])
    const { events } = useSelector(state => state.events);
    return (
        <div className="contenedor-lista-eventos-ysm">
            <div className="header-crud-eventos-ysm">
                <div className="titulo-listas-crud-eventos-ysm">Lista Eventos</div>
            </div>
            <div className="body-listaeventos-eventos-ysm">
                {events.map(({ titulo, id, descripcion, start, end, tipo}, i) =>
                    (tipo == "Evento") ?
                        <div className="contenedor-card-listaeventos-eventos-ysm">
                            <div class="card card-eventos-ysm">
                                <div class="header-card-eventos-ysm estilo-x">
                                    {titulo}
                                </div>
                                <div class="body-card-eventos-ysm">
                                    {descripcion}
                                </div>
                                <div class="footer-card-eventos-ysm ">
                                    <div class="izquierda-footer-card-eventos-ysm ">
                                    
                                        <i className="fas fa-trash iconos-lu iconos-eventos-ysm" onClick={() => { eliminarEvento(id); }}></i>
                                        
                                    </div>
                                    <div class="mitad-footer-card-eventos-ysm ">
                                        <div class="fechainicio-mitad-footer-eventos-ysm estilo-x ">
                                            {moment(start).format("DD-MM-yy")}
                                        </div>
                                        <div class="fechafin-footer-card-eventos-ysm estilo-x ">
                                            {moment(end).format("DD-MM-yy")}
                                        </div>
                                    </div>
                                    <div class="derecha-footer-card-eventos-ysm ">
                                    <Link to="/eventos">
                                        <i className="fas fa-pencil-alt iconos-lu iconos-eventos-ysm" onClick={() => { editarUsuario(titulo, id, descripcion, start, end, tipo); }}></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        :
                        ""
                )}
            </div>
        </div>
    )
}

export const ListaDeReuniones = () => {

    //Handles
    const eliminarEvento = (id) => {
        dispatch(eventsStartDelete(id));
    };

    const editarUsuario = (titulo, id, descripcion, start, end, tipo) => {
        const prueba = { titulo, id, descripcion, start, end, tipo };
        dispatch(eventsSetActive(prueba));
    };

    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(eventsStartLoading());

    }, [dispatch])
    const { events } = useSelector(state => state.events);
    return (
        <div className="contenedor-lista-eventos-ysm">
            <div className="header-crud-eventos-ysm">
                <div className="titulo-listas-crud-eventos-ysm">Lista Reuniones</div>
            </div>
            <div className="body-listaeventos-eventos-ysm">
                {events.map(({ titulo, tipo, id, descripcion, start, end }, i) =>
                    (tipo == "Reunion") ?
                        <div className="contenedor-card-listaeventos-eventos-ysm">
                            <div class="card card-eventos-ysm">
                                <div class="header-card-eventos-ysm estilo-x">
                                    {titulo}
                                </div>
                                <div class="body-card-eventos-ysm">
                                    {descripcion}
                                </div>
                                <div class="footer-card-eventos-ysm ">
                                    <div class="izquierda-footer-card-eventos-ysm ">
                                        <i className="fas fa-trash iconos-lu iconos-eventos-ysm" onClick={() => { eliminarEvento(id); }}></i>
                                    </div>
                                    <div class="mitad-footer-card-eventos-ysm ">
                                        <div class="fechainicio-mitad-footer-eventos-ysm estilo-x">
                                            {moment(start).format("DD-MM-yy")}
                                        </div>
                                        <div class="fechafin-footer-card-eventos-ysm estilo-x">
                                            {moment(end).format("DD-MM-yy")}
                                        </div>
                                    </div>
                                    <div class="derecha-footer-card-eventos-ysm ">
                                    <Link to="/eventos">
                                        <i className="fas fa-pencil-alt iconos-lu iconos-eventos-ysm" onClick={() => { editarUsuario(titulo, id, descripcion, start, end, tipo); }}></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : (tipo != "Reunion") ?
                            ""
                            : (events.length == 0) ?
                                <div className="contenedor-card-listaeventos-eventos-ysm">
                                    <i class="far fa-calendar-times icono-lu"></i>
                                </div>
                                :
                                ""
                )}
            </div>
        </div>
    )
}
