import { FETCH_CATS_START, FETCH_CATS_SUCCESS, FETCH_CATS_ERROR } from "../actions/actionTypes";

const initialState = {
    cats: [],
    loading: true,
    error: null
}

export default function catsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATS_START: 
            return {
                ...state, loading: true
            }
        case FETCH_CATS_SUCCESS:
            return {
                ...state, loading: false, cats: action.cats
            }
        case FETCH_CATS_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        default:
            return state
    }
}