import breed from '../../axios/axios'
import { FETCH_CATS_START, FETCH_CATS_SUCCESS, FETCH_CATS_ERROR } from './actionTypes';

export function fetchCats() {
    return async dispatch => {
        dispatch(fetchCatsStart())

        try {

            const response = await breed.get('/breeds')
            const cats = []

            Object.values(response.data).forEach((breed, index) => {
                cats.push({
                    id: breed.id,
                    url: breed.wikipedia_url,
                    name: breed.name
                })
            })

            dispatch(fetchCatsSuccess(cats))

        } catch(e) {
            dispatch(fetchCatsError(e))
        }
    }
}

export function fetchCatsStart() {
    return {
        type: FETCH_CATS_START
    }
}

export function fetchCatsSuccess(cats) {
    return {
        type: FETCH_CATS_SUCCESS,
        cats
    }
}

export function fetchCatsError(e) {
    return {
        type: FETCH_CATS_ERROR,
        error: e
    }
}