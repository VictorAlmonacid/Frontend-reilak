import { types } from '../types/types';


const initialState = {
    tareas: [],
    activeTareas: null,
    tareasImage: [],
    comentarios:[],
};

export const tareaReducer = (state = initialState, action) => {


    switch (action.type) {

        case types.tareasAddNew:
            return {
                ...state,
                tareas: [
                    ...state.tareas,
                    action.payload
                ]
            }

        case types.tareasUpdated:
            return {
                ...state,
                tareas: state.tareas.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }


        case types.tareasSetActive:
            return {
                ...state,
                activeTareas: action.payload
            }

        case types.tareasDeleted:
            return {
                ...state,
                activeTareas: null
            }


        case types.tareasImageLoaded:
            return {
                ...state,
                tareasImage: action.payload
            }

        case types.ImageTareaAddNew:
            return {
                ...state,
                tareasImage: [
                    ...state.tareasImage,
                    action.payload
                ]
            }

        case types.imageTareaDeleted:
            return {
                ...state,
                tareasImage: state.tareasImage.filter(
                    e => (e.id !== state.activeTareas.id)
                ),
                activeEvents: null
            }

        case types.createComment:
            return {
                ...state,
                comentarios: [
                    ...state.comentarios,
                    action.payload
                ]
            }


case types.LoadComentarios:

        return {
            ...state,
            comentarios: [...action.payload]
        }
    

       
 


       case types.tareasLoaded:
            return {
                ...state,
                tareas: [...action.payload]
            }

        default:
            return state;
    }
}
