import Swal from 'sweetalert2';
import { fetchConAxios, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import moment from 'moment';

export const dashboardCantidadUsuario = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken("dashboard/dcantidadu/");
            const body = await resp.json();
            const users = body.usuario1;
            // users = {
            //     conectados: users.length
            dispatch(dashboardLoaded(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardLoaded = (dashboard) => ({
    type: types.dashboardLoaded,
    payload: dashboard,
});

export const dashboardUsersOnline = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken("dashboard/usersonline/");
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardUsuariosOnline(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardUsuariosOnline = (dashboard) => ({
    type: types.dashboardUsuariosOnline,
    payload: dashboard,
});

export const dashboardUOTW = () => {

    return async (dispatch) => {


        // CALCULO FECHA INICIO
        var date = moment();
        const diaDeLaSemana = moment().isoWeekday()
        const resta = diaDeLaSemana - 1

        // CALCULO FECHA INICIO
        var date = moment();
        const { _d } = date.subtract(resta, 'days')
        const fechaGG = new Date(_d)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")
        console.log(fechaInicio)
        console.log("Primer dia de la semana", date)
        try {
            const resp = await fetchConToken(`dashboard/usersotw/${fechaInicio}`, fechaInicio);
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardUsuariosOffline(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardUsuariosOffline = (dashboard) => ({
    type: types.dashboardUsuariosOffline,
    payload: dashboard,
});

export const dashboardPOTW = () => {

    return async (dispatch) => {
        //CALCULO PRIMER DIA DE LA SEMANA
        const diaDeLaSemana = moment().isoWeekday()
        const resta = diaDeLaSemana - 1

        // CALCULO FECHA INICIO
        var date = moment();
        const { _d } = date.subtract(resta, 'days')
        const fechaGG = new Date(_d)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")

        //CALCULO SEGUNDO DIA DE LA SEMANA
        var date2 = moment("2021-07-30")
        const diaDeLaSemana2 = moment().isoWeekday()
        const suma = 7 - diaDeLaSemana2
        // CALCULO FECHA INICIO
        const d = date2.add(suma, 'days')
        const d2 = d._d
        const fechaGG2 = new Date(d2)
        const fechaFin = moment(fechaGG2).format("yy-MM-DD")
        try {
            const resp = await fetchConToken(`dashboard/potw/${fechaInicio}`, fechaInicio);
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardPublicacionesSemanales(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardPublicacionesSemanales = (dashboard) => ({
    type: types.dashboardPublicacionesSemanales,
    payload: dashboard,
});

export const dashboardEOTW = () => {

    return async (dispatch) => {
        //CALCULO PRIMER DIA DE LA SEMANA
        const diaDeLaSemana = moment().isoWeekday()
        const resta = diaDeLaSemana - 1

        // CALCULO FECHA INICIO
        var date = moment();
        const { _d } = date.subtract(resta, 'days')
        const fechaGG = new Date(_d)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")

        //CALCULO SEGUNDO DIA DE LA SEMANA
        var date2 = moment("2021-07-30")
        const diaDeLaSemana2 = moment().isoWeekday()
        const suma = 7 - diaDeLaSemana2
        // CALCULO FECHA INICIO
        const d = date2.add(suma, 'days')
        const d2 = d._d
        const fechaGG2 = new Date(d2)
        const fechaFin = moment(fechaGG2).format("yy-MM-DD")
        try {
            const resp = await fetchConToken(`dashboard/eotw/${fechaInicio}`, fechaInicio);
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardEventosSemanales(users));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardEventosSemanales = (dashboard) => ({
    type: types.dashboardEventosSemanales,
    payload: dashboard,
});

export const dashboardCD = () => {

    return async (dispatch) => {
        //CALCULO PRIMER DIA DE LA SEMANA
        const diaDeLaSemana = moment().isoWeekday()
        const resta = diaDeLaSemana - 1
        // CALCULO FECHA INICIO
        var date = moment();
        // var date = moment("2021-08-01")
        const fechaGG = new Date(date)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")
        const dia2 = moment(fechaInicio).subtract(1, 'days');
        const dia3 = moment(fechaInicio).subtract(2, 'days');
        const dia4 = moment(fechaInicio).subtract(3, 'days');
        const dia5 = moment(fechaInicio).subtract(4, 'days');
        const dia6 = moment(fechaInicio).subtract(5, 'days');
        const dia7 = moment(fechaInicio).subtract(6, 'days');
        const segundo = moment(dia2).format("yy-MM-DD")
        const tercero = moment(dia3).format("yy-MM-DD")
        const cuarto = moment(dia4).format("yy-MM-DD")
        const quinto = moment(dia5).format("yy-MM-DD")
        const sexto = moment(dia6).format("yy-MM-DD")
        const septimo = moment(dia7).format("yy-MM-DD")
        try {
            const resp = await fetchConToken(`dashboard/conexionesdiarias/${fechaInicio}`, fechaInicio);
            const body = await resp.json();
            const users1 = body.usuario1.length;
            const resp2 = await fetchConToken(`dashboard/conexionesdiarias/${segundo}`, segundo);
            const body2 = await resp2.json();
            const users2 = body2.usuario1.length;

            const resp3 = await fetchConToken(`dashboard/conexionesdiarias/${tercero}`, tercero);
            const body3 = await resp3.json();
            const users3 = body3.usuario1.length;

            const resp4 = await fetchConToken(`dashboard/conexionesdiarias/${cuarto}`, cuarto);
            const body4 = await resp4.json();
            const users4 = body4.usuario1.length;

            const resp5 = await fetchConToken(`dashboard/conexionesdiarias/${quinto}`, quinto);
            const body5 = await resp5.json();
            const users5 = body5.usuario1.length;

            const resp6 = await fetchConToken(`dashboard/conexionesdiarias/${sexto}`, sexto);
            const body6 = await resp6.json();
            const users6 = body6.usuario1.length;

            const resp7 = await fetchConToken(`dashboard/conexionesdiarias/${septimo}`, septimo);
            const body7 = await resp7.json();
            const users7 = body7.usuario1.length;
            const conexiones = {
                dia7: users1,
                dia6: users2,
                dia5: users3,
                dia4: users4,
                dia3: users5,
                dia2: users6,
                dia1: users7
            }
            dispatch(dashboardConexionesDiarias(conexiones));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardConexionesDiarias = (dashboard) => ({
    type: types.dashboardConexionesDiarias,
    payload: dashboard,
});