import { fetchConAxios, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const dashboardCantidadUsuarios = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dcantidadu/`);
            const body = await resp.json();
            console.log(body);
            const conexiones = body.usuario1;
            dispatch(dashboardCantidadU(conexiones));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardCantidadU = (dashboard) => ({
    type: types.dashboardCantidadU,
    payload: dashboard,
});

export const dashboardUsuariosConectados = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dusuariosc/`);
            const body = await resp.json();
            console.log(body);
            const conexiones = body.usuario1;
            dispatch(dashboardUsuariosC(conexiones));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardUsuariosC = (dashboard) => ({
    type: types.dashboardUsuariosC,
    payload: dashboard,
});

export const dashboardRadioConexiones = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dradiocs/`);
            const body = await resp.json();
            console.log(body);
            const conexiones = body.usuario1;
            dispatch(dashboardRadiosCo(conexiones));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosCo = (dashboard) => ({
    type: types.dashboardRadiosCo,
    payload: dashboard,
});

export const dashboardRadioCantidadEdad = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dradioce/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosCE(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosCE = (dashboard) => ({
    type: types.dashboardRadiosCE,
    payload: dashboard,
});

export const dashboardRadioCantidadArea = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dradioca/`);
            const body = await resp.json();

            const cantidad = body.usuario1;
            console.log(cantidad);
            dispatch(dashboardRadiosCA(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosCA = (dashboard) => ({
    type: types.dashboardRadiosCA,
    payload: dashboard,
});


export const dashboardRadioCantidadCargo = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dradiocc/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosCC(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosCC = (dashboard) => ({
    type: types.dashboardRadiosCC,
    payload: dashboard,
});


export const dashboardRadioCantidadRol = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dradiocr/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosCR(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosCR = (dashboard) => ({
    type: types.dashboardRadiosCR,
    payload: dashboard,
});

export const dashboardRadioPublicacionesUsuarios = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dradiopu/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosPU(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosPU = (dashboard) => ({
    type: types.dashboardRadiosPU,
    payload: dashboard,
});

export const dashboardRadioPublicacionesFecha = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dvalorespf/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosPF(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosPF = (dashboard) => ({
    type: types.dashboardRadiosPF,
    payload: dashboard,
});

export const dashboardRadioPublicacionesCategoria = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dradiopc/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosPC(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosPC = (dashboard) => ({
    type: types.dashboardRadiosPC,
    payload: dashboard,
});

export const dashboardRadioEventosUsuarios = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dradioeu/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosEU(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosEU = (dashboard) => ({
    type: types.dashboardRadiosEU,
    payload: dashboard,
});

export const dashboardRadioEventoFecha = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dvaloresef/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosEF(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosEF = (dashboard) => ({
    type: types.dashboardRadiosEF,
    payload: dashboard,
});

export const dashboardRadioEventoCategoria = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dradioec/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosEC(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosEC = (dashboard) => ({
    type: types.dashboardRadiosEC,
    payload: dashboard,
});

export const dashboardRadioGruposUsuarios = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dradioecg/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosGU(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosGU = (dashboard) => ({
    type: types.dashboardRadiosGU,
    payload: dashboard,
});

export const dashboardRadioCanalesUsuarios = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dvalorescu/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosCU(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosCU = (dashboard) => ({
    type: types.dashboardRadiosCU,
    payload: dashboard,
});

export const dashboardRadioUsuariosChat = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dradiouc/`);
            const body = await resp.json();
            console.log(body);
            const cantidad = body.usuario1;
            dispatch(dashboardRadiosUC(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardRadiosUC = (dashboard) => ({
    type: types.dashboardRadiosUC,
    payload: dashboard,
});