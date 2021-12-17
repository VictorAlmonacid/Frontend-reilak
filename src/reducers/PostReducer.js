
import { types } from '../types/types';

// {
//     id: new Date().getTime(),
//    title: 'Cumpleaños del jefe',
//    start: moment().toDate(),
//    end: moment().add(2, 'hours').toDate(),
//    bgcolor: '#fafafa',
//    note: 'Comprar el pastel',
//    user: {
//        _id: '123',
//        name: 'Juan'
//    }
// }

const initialState = {
     posts: [],
    activePost: null

};

export const postReducer = (state = initialState, action) => {
    switch (action.type){

        case types.postSetActive:
            return {
                ...state,
                activePost: action.payload
            }

        case types.postAddNew:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts,
                    
                ]
            }

        case types.postClearActiveEvent:
            return {
                ...state,
                activePost: null
            }
        
        case types.postUpdated:
            return {
                ...state,
                posts: state.posts.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }

        case types.postDeleted:
            return {
                ...state,
                posts: state.posts.filter(
                    e => ( e.id !== state.activePost.id )
                ),
                activePost: null
            }

        case types.postLoaded:
            return {
                ...state,
                posts: [...action.payload]
            }

        default:
            return state;
    }
}