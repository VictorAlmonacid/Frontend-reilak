import { fetchConAxios, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const totaLTiempoConexion = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken("dashboard/ttc", event, "POST");
            const body = await resp.json();
            const cantidad = body.tiempoConexion;
            dispatch(dashboardTiempoTC(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardTiempoTC = (dashboard) => ({
    type: types.dashboardTiempoTC,
    payload: dashboard,
});

export const totaLCantidadTiempoConexion = (event) => {
    return async (dispatch) => {
        try {
            console.log(event);
            const resp = await fetchConToken("dashboard/prcf", event, "GET");
            const body = await resp.json();
            console.log(body);
            const cantidad = body.tiempoConexion;
            console.log(cantidad);
            dispatch(dashboardCTiempoTC(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardCTiempoTC = (dashboard) => ({
    type: types.dashboardCTiempoTC,
    payload: dashboard,
});

export const valoresCantidadChats = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dvalorescc`, "GET");
            const body = await resp.json();
            console.log(body);
            const cantidad = body.chats;
            dispatch(dashboardCantidadCC(cantidad));
        } catch (error) {
            console.log(error)
        }

    }
}

const dashboardCantidadCC = (dashboard) => ({
    type: types.dashboardCantidadCC,
    payload: dashboard,
});

export const valoresCantidadChatsPersonal = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dvaloresccp`, "GET");
            const body = await resp.json();
            console.log(body);
            const cantidad = body.chats;
            dispatch(dashboardCantidadCCP(cantidad));
        } catch (error) {
            console.log(error)
        }

    }
}

const dashboardCantidadCCP = (dashboard) => ({
    type: types.dashboardCantidadCCP,
    payload: dashboard,
});

export const valoresCantidadChatsGrupal = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dvaloresccg`, "GET");
            const body = await resp.json();
            console.log(body);
            const cantidad = body.chats;
            dispatch(dashboardCantidadCCG(cantidad));
        } catch (error) {
            console.log(error)
        }

    }
}

const dashboardCantidadCCG = (dashboard) => ({
    type: types.dashboardCantidadCCG,
    payload: dashboard,
});

export const valoresCantidadChatsCanal = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dvaloresccc`, "GET");
            const body = await resp.json();
            console.log(body);
            const cantidad = body.chats;
            dispatch(dashboardCantidadCCC(cantidad));
        } catch (error) {
            console.log(error)
        }

    }
}

const dashboardCantidadCCC = (dashboard) => ({
    type: types.dashboardCantidadCCC,
    payload: dashboard,
});

export const valoresCantidadTareas = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dvaloresct`, "GET");
            const body = await resp.json();
            console.log(body);
            const cantidad = body.tareas;
            dispatch(dashboardCantidadTareas(cantidad));
        } catch (error) {
            console.log(error)
        }

    }
}

const dashboardCantidadTareas = (dashboard) => ({
    type: types.dashboardCantidadTareas,
    payload: dashboard,
});

export const valoresCantidadTareasProceso = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dvaloresctp`, "GET");
            const body = await resp.json();
            console.log(body);
            const cantidad = body.tareas;
            dispatch(dashboardCantidadTareasProceso(cantidad));
        } catch (error) {
            console.log(error)
        }

    }
}

const dashboardCantidadTareasProceso = (dashboard) => ({
    type: types.dashboardCantidadTareasProceso,
    payload: dashboard,
});

export const valoresCantidadTareasAtrasadas = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dvalorescta`, "GET");
            const body = await resp.json();
            console.log(body);
            const cantidad = body.tareas;
            dispatch(dashboardCantidadTareasAtrasadas(cantidad));
        } catch (error) {
            console.log(error)
        }

    }
}

const dashboardCantidadTareasAtrasadas = (dashboard) => ({
    type: types.dashboardCantidadTareasAtrasadas,
    payload: dashboard,
});

export const valoresCantidadTareasCompletadas = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dvaloresctc`, "GET");
            const body = await resp.json();
            console.log(body);
            const cantidad = body.tareas;
            dispatch(dashboardCantidadTareasCompletadas(cantidad));
        } catch (error) {
            console.log(error)
        }

    }
}

const dashboardCantidadTareasCompletadas = (dashboard) => ({
    type: types.dashboardCantidadTareasCompletadas,
    payload: dashboard,
});