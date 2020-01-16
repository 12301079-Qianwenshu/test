import "babel-polyfill"
import React from "react"
import { render } from "react-dom"
import { Provider } from 'react-redux'

import "static/scss/iconfont/iconfont.scss"
import "static/scss/app.scss"

import Routes from './routes/index'

import { createStore, applyMiddleware } from 'redux'
import { finalReducer } from 'reduxs/reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';

const logger = createLogger(); //redux action 信息
const store = createStore(  //生成store对象
    finalReducer,
    applyMiddleware(logger, thunk)
);

render(
    // 使用Provider 组件将APP主组件包裹住，这样内部组件都有Store种提供的属性。
    < Provider store={store} >
        <Routes />
    </Provider >,
    document.getElementById("root")
)
