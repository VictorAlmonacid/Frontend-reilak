export const dashboardGraficoConexionesSemanales = (datos) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dgraficocs/`,datos);
            const body = await resp.json();
            const conexiones = body.usuario;
            dispatch(dashboardGraficoCS(conexiones));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardGraficoCS = (dashboard) => ({
    type: types.dashboardGraficoCS,
    payload: dashboard,
});

export const dashboardGraficoConexionesMensual = (datos) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dgraficocm/`,datos);
            const body = await resp.json();
            const conexiones = body.usuario;
            dispatch(dashboardGraficoCM(conexiones));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardGraficoCM = (dashboard) => ({
    type: types.dashboardGraficoCM,
    payload: dashboard,
});

export const dashboardGraficoEdad = (datos) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dgraficoe/`,datos);
            const body = await resp.json();
            const cantidad = body.usuario;
            dispatch(dashboardGraficoE(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardGraficoE = (dashboard) => ({
    type: types.dashboardGraficoE,
    payload: dashboard,
});

export const dashboardGraficoPublicaciones = (datos) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dgraficop/`,datos);
            const body = await resp.json();
            const cantidad = body.usuario;
            dispatch(dashboardGraficoP(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardGraficoP = (dashboard) => ({
    type: types.dashboardGraficoP,
    payload: dashboard,
});

export const dashboardGraficoEventos = (datos) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dgraficoev/`,datos);
            const body = await resp.json();
            const cantidad = body.usuario;
            dispatch(dashboardGraficoEv(cantidad));
        } catch (error) {
            console.log(error)
        }
    }
}

const dashboardGraficoEv = (dashboard) => ({
    type: types.dashboardGraficoEv,
    payload: dashboard,
});