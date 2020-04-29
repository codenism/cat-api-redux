import {combineReducers} from 'redux'
import catsReducer from './cats'

export default combineReducers({
    cats: catsReducer
})