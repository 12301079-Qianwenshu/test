/*
 * @Description: 
 * @Author: shuqianwen
 * @Date: 2019-09-06 18:20:31
 * @LastEditors  : shuqianwen
 * @LastEditTime : 2020-01-15 15:39:58
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import style from './style.scss'
import { connect } from 'react-redux'
import { addNameCreater, addAgeCreater, addNameAsync } from 'reduxs/actions'

class Demo extends Component {

    //点击事件
    handlerFunc = () => {
        const inputName = this.refs.inputValueTest.value;
        const { dispatch } = this.props;
        dispatch(addNameCreater(inputName))
    }

    handlerAgeFunc = () => {
        const inputage = this.refs.inputValueAge.value;
        const { dispatch } = this.props;
        dispatch(addAgeCreater(inputage))
    }

    handlerAsyncFunc = () => {
        const inputName = this.refs.inputValueTest.value;
        const { dispatch } = this.props;
        dispatch(addNameAsync(inputName))
    }

    componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    render() {
        const { lastname, lastage } = this.props;

        return (
            <div className={style.demo}>
                <header>
                    <h1>Welcome to React</h1>
                </header>
                <label> {lastname} </label><br />
                <input ref="inputValueTest" /><br />
                <button onClick={this.handlerFunc}>confirm</button><br />

                <label> {lastage} </label><br />
                <input ref="inputValueAge" />
                <button onClick={this.handlerAgeFunc}>confirm</button><br />

                <button onClick={this.handlerAsyncFunc}>Async Confirm</button><br />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lastname: state.addNameReducer,
        lastage: state.addAgeReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo)