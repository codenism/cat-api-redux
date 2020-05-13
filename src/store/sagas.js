import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import axios from '../axios/axios'
import { FETCH_CATS, FETCH_CATS_START, FETCH_CATS_SUCCESS, FETCH_CATS_ERROR, FETCH_CAT, FETCH_CAT_START, FETCH_CAT_SUCCESS, FETCH_CAT_ERROR } from './actions/actionTypes';

function* fetchCatsAsync() {
    try {
        yield put(fetchCatsStart())
        const data = yield call(() => {
            return axios.get('/breeds')
                .then(res => res.data)
        })
        const cats = []

        Object.values(data).forEach((breed, index) => {
            cats.push({
                key: breed.id + '_' + index,
                id: breed.id,
                url: breed.wikipedia_url,
                name: breed.name
            })
        })

        yield put(fetchCatsSuccess(cats))
    } catch(error) {
        yield put(fetchCatsError(error))
    }
}

function* fetchCatByIdAsync(action) {
    try {
        yield put(fetchCatStart())

        const data = yield call(() => {
            return axios.get(`/breeds/search?q=${action.breed}`).then(res => res.data[0])
        })

        const images = yield call(() => {
            return axios.get('/images/search', {
                            limit:8,
                            size:"full",
                            breed_id: action.breed
                        })
                            .then(res => res.data)
        })

        data.images = images

        yield put(fetchCatSuccess(data))
    } catch(error) {
        yield put(fetchCatError(error))
    }
}

function* mySaga() {
    yield takeEvery(FETCH_CATS, fetchCatsAsync)
    yield takeEvery(FETCH_CAT, fetchCatByIdAsync)
}

export const fetchCats = () => {
    return {
        type: FETCH_CATS
    }
}
const fetchCatsStart = () => {
    return {
        type: FETCH_CATS_START
    }
}

const fetchCatsSuccess = (cats) => {
    return {
        type: FETCH_CATS_SUCCESS,
        cats
    }
}

const fetchCatsError = (e) => {
    return {
        type: FETCH_CATS_ERROR,
        error: e
    }
}

export const fetchCatById = (breed) => {
    return {
        type: FETCH_CAT,
        breed
    }
}

const fetchCatStart = () => {
    return {
        type: FETCH_CAT_START
    }
}

const fetchCatSuccess = (cat) => {
    return {
        type: FETCH_CAT_SUCCESS,
        cat
    }
}

const fetchCatError = (error) => {
    return {
        type: FETCH_CAT_ERROR,
        error
    }
}

export default mySaga