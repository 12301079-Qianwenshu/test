/*
 * @Description: 
 * @Author: shuqianwen
 * @Date: 2019-09-06 18:20:31
 * @LastEditors  : shuqianwen
 * @LastEditTime : 2020-01-16 14:08:13
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import style from './style.scss'

class Index extends Component {

    componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    render() {

        return (
            <div className={style.index}>
                <header>
                    <h1>Welcome to React</h1>
                </header>
            </div>
        )
    }
}

export default Index