import axios from '../../axios/axios-image'
import { FETCH_CATS_START, FETCH_CATS_SUCCESS, FETCH_CATS_ERROR } from './actionTypes';

export function fetchCats() {
    return async dispatch => {
        dispatch(fetchCatsStart())

        try {

            const response = await axios.get('/images/search', { params: { limit:10, size:"full" } })
            const cats = []

            Object.values(response.data).forEach((image, index) => {
                cats.push({
                    id: image.id,
                    url: image.url,
                    name: `Киса номер ${index + 1}`
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