import { types } from '../types/types';

const initialState = {
    dashboardloaded: [],
    //RADIOS
    rconexionessemanales: [],
    rcantidadedad: [],
    rcantidadarea: [],
    rcantidadcargo: [],
    rcantidadrol: [],
    rcantidadrol: [],
    rcantidadpublicacionesusuarios: [],
    rcantidadpublicacionesfecha: [],
    rcantidadpublicacionescategoria: [],
    rcantidadeventosusuarios: [],
    rcantidadeventosfecha: [],
    rcantidadeventoscategoria: [],
    rcantidadgruposusuarios: [],
    rcantidadchatusuarios: [],
    rcantidadusuarioschat: [],
    cantidadcantidadusuarios: [],
    cantidadusuariosconectados: []
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.dashboardLoaded:
            return {
                ...state,
                dashboardloaded: action.payload
            }
        case types.dashboardRadiosCo:
            return {
                ...state,
                rconexionessemanales: action.payload
            }
        case types.dashboardRadiosCE:
            return {
                ...state,
                rcantidadedad: action.payload
            }
        case types.dashboardRadiosCA:
            return {
                ...state,
                rcantidadarea: action.payload
            }
        case types.dashboardRadiosCC:
            return {
                ...state,
                rcantidadcargo: action.payload
            }
        case types.dashboardRadiosCR:
            return {
                ...state,
                rcantidadrol: action.payload
            }
        case types.dashboardRadiosPU:
            return {
                ...state,
                rcantidadpublicacionesusuarios: action.payload
            }
        case types.dashboardRadiosPF:
            return {
                ...state,
                rcantidadpublicacionesfecha: action.payload
            }
        case types.dashboardRadiosPC:
            return {
                ...state,
                rcantidadpublicacionescategoria: action.payload
            }
        case types.dashboardRadiosEU:
            return {
                ...state,
                rcantidadeventosusuarios: action.payload
            }
        case types.dashboardRadiosEF:
            return {
                ...state,
                rcantidadeventosfecha: action.payload
            }
        case types.dashboardRadiosEC:
            return {
                ...state,
                rcantidadeventoscategoria: action.payload
            }
        case types.dashboardRadiosGU:
            return {
                ...state,
                rcantidadgruposusuarios: action.payload
            }
        case types.dashboardRadiosCU:
            return {
                ...state,
                rcantidadchatusuarios: action.payload
            }
        case types.dashboardRadiosUC:
            return {
                ...state,
                rcantidadusuarioschat: action.payload
            }
        case types.dashboardCantidadU:
            return {
                ...state,
                cantidadcantidadusuarios: action.payload
            }
        case types.dashboardUsuariosC:
            return {
                ...state,
                cantidadusuariosconectados: action.payload
            }
        default:
            return state;
    }
}