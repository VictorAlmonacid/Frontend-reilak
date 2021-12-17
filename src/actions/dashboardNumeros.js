export const dashboardValoresConectadosAhora = (datos) => {
    var date = moment();
        // var date = moment("2021-08-01")
        const fechaGG = new Date(date)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")
        const dia2 = moment(fechaInicio).subtract(1, 'days');
        const dia7 = moment(fechaInicio).subtract(6, 'days');
        const segundo = moment(dia2).format("yy-MM-DD")
        const septimo = moment(dia7).format("yy-MM-DD")
        const fechas = {
            primeraFecha: segundo, 
            segundaFecha: septimo
        }
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dgraficocs/`,fechas);
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardRadiosCo(users));
        } catch (error) {
            console.log(error)
        }
    }
}

export const dashboardValoresPublicaciones = (datos) => {
    var date = moment();
        // var date = moment("2021-08-01")
        const fechaGG = new Date(date)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")
        const dia2 = moment(fechaInicio).subtract(1, 'days');
        const dia7 = moment(fechaInicio).subtract(6, 'days');
        const segundo = moment(dia2).format("yy-MM-DD")
        const septimo = moment(dia7).format("yy-MM-DD")
        const fechas = {
            primeraFecha: segundo, 
            segundaFecha: septimo
        }
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dgraficocs/`,fechas);
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardRadiosCo(users));
        } catch (error) {
            console.log(error)
        }
    }
}

export const dashboardValoresEventos = (datos) => {
    var date = moment();
        // var date = moment("2021-08-01")
        const fechaGG = new Date(date)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")
        const dia2 = moment(fechaInicio).subtract(1, 'days');
        const dia7 = moment(fechaInicio).subtract(6, 'days');
        const segundo = moment(dia2).format("yy-MM-DD")
        const septimo = moment(dia7).format("yy-MM-DD")
        const fechas = {
            primeraFecha: segundo, 
            segundaFecha: septimo
        }
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dgraficocs/`,fechas);
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardRadiosCo(users));
        } catch (error) {
            console.log(error)
        }
    }
}

export const dashboardValoresGruposChat = (datos) => {
    var date = moment();
        // var date = moment("2021-08-01")
        const fechaGG = new Date(date)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")
        const dia2 = moment(fechaInicio).subtract(1, 'days');
        const dia7 = moment(fechaInicio).subtract(6, 'days');
        const segundo = moment(dia2).format("yy-MM-DD")
        const septimo = moment(dia7).format("yy-MM-DD")
        const fechas = {
            primeraFecha: segundo, 
            segundaFecha: septimo
        }
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dgraficocs/`,fechas);
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardRadiosCo(users));
        } catch (error) {
            console.log(error)
        }
    }
}

export const dashboardValoresCanalesChat = (datos) => {
    var date = moment();
        // var date = moment("2021-08-01")
        const fechaGG = new Date(date)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")
        const dia2 = moment(fechaInicio).subtract(1, 'days');
        const dia7 = moment(fechaInicio).subtract(6, 'days');
        const segundo = moment(dia2).format("yy-MM-DD")
        const septimo = moment(dia7).format("yy-MM-DD")
        const fechas = {
            primeraFecha: segundo, 
            segundaFecha: septimo
        }
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dgraficocs/`,fechas);
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardRadiosCo(users));
        } catch (error) {
            console.log(error)
        }
    }
}

export const dashboardValoresUsuariosRegistrados = (datos) => {
    var date = moment();
        // var date = moment("2021-08-01")
        const fechaGG = new Date(date)
        const fechaInicio = moment(fechaGG).format("yy-MM-DD")
        const dia2 = moment(fechaInicio).subtract(1, 'days');
        const dia7 = moment(fechaInicio).subtract(6, 'days');
        const segundo = moment(dia2).format("yy-MM-DD")
        const septimo = moment(dia7).format("yy-MM-DD")
        const fechas = {
            primeraFecha: segundo, 
            segundaFecha: septimo
        }
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`dashboard/dgraficocs/`,fechas);
            const body = await resp.json();
            const users = body.usuario;
            dispatch(dashboardRadiosCo(users));
        } catch (error) {
            console.log(error)
        }
    }
}