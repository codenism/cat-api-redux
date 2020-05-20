import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import axios from '../axios/axios'
import { FETCH_CATS, FETCH_CATS_START, FETCH_CATS_SUCCESS, FETCH_CATS_ERROR, FETCH_CAT_IMAGES, FETCH_CAT_IMAGES_START, FETCH_CAT_IMAGES_SUCCESS, FETCH_CAT_IMAGES_ERROR, CAT_RESET } from './actions/actionTypes';

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

function* fetchCatImagesByIdAsync(action) {
    try {
        yield put(fetchCatImagesStart())

        const data = yield call(() => {
            return axios.get(`/breeds/search?q=${action.name}`)
                            .then(res => res.data[0])
        })

        const images = yield call(() => {
            return axios.get('/images/search', {
                            limit:8,
                            size:"full",
                            breed_id: action.breed
                        })
                            .then(res => res.data[0])
        })

        data.images = images

        yield put(fetchCatImagesSuccess(data))
    } catch(error) {
        yield put(fetchCatImagesError(error))
    }
}

function* mySaga() {
    yield takeEvery(FETCH_CATS, fetchCatsAsync)
    yield takeEvery(FETCH_CAT_IMAGES, fetchCatImagesByIdAsync)
}

export const fetchCats = () => {
    return {
        type: FETCH_CATS
    }
}

export const resetCat = () => {
    return {
        type: CAT_RESET
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

export const fetchCatImagesById = (breed, name) => {
    return {
        type: FETCH_CAT_IMAGES,
        breed,
        name
    }
}

const fetchCatImagesStart = () => {
    return {
        type: FETCH_CAT_IMAGES_START
    }
}

const fetchCatImagesSuccess = (cat) => {
    return {
        type: FETCH_CAT_IMAGES_SUCCESS,
        cat
    }
}

const fetchCatImagesError = (error) => {
    return {
        type: FETCH_CAT_IMAGES_ERROR,
        error
    }
}

export default mySaga