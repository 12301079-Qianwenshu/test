//包含n个reducer函数的模块
import { combineReducers } from 'redux'
import { addNameReducer, addAgeReducer } from './demo'

export const finalReducer = combineReducers({
    addNameReducer, 
    addAgeReducer
})