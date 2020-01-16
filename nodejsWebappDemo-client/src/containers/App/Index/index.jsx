/*
 * @Description: 
 * @Author: shuqianwen
 * @Date: 2019-09-06 18:20:31
 * @LastEditors  : shuqianwen
 * @LastEditTime : 2020-01-15 16:14:50
 */
import React, { Component } from 'react'
import style from './style.scss'
import LoginService from 'service/Login'

class Index extends Component {
    state = {
        name: 'koa',
        password: '',
        result: '请登录'
    }

    nameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    pswChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    login = () => {
        let { name, password } = this.state
        let data = {
            name,
            password
        }
        LoginService.signin(data).then(res => {
            console.log(res)
            if (res.code == 0) {
                this.setState({
                    result: `Welcome ${res.detail.name}`
                })
            } else if (res.code == 401) {
                this.setState({
                    result: res.detail.msg
                })
            }
        })
    }

    render() {
        const { name, password, result } = this.state

        return (
            <div className={style.index}>
                <header>
                    <h1>Welcome to React</h1>
                </header>
                <p>Name: <input name="name" value={name} onChange={this.nameChange} /></p>
                <p>Password: <input name="password" type="password" value={password} onChange={this.pswChange} /></p>
                <p><button onClick={this.login}>提交</button></p>
                <div>{result}</div>
            </div>
        )
    }
}

export default Index