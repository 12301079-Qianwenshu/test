import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import style from './style.scss'
import { Menu, Icon } from 'antd'
import { MENUS } from 'constants/menuInfo.js'

const { SubMenu } = Menu

class Header extends Component {

    state = {
        menus: [],
        openKeys: [],
        selectedKeys: [],
        fixedactive: false,
        directMenu: []
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
    }

    handleClick = ({ key, item }) => {
        const url = item.props.url;
        this.setState({
            selectedKeys: [key]
        });
        this.props.history.push(url)

    }

    addKeys = (menuList) => {
        let key = 0;
        this.traversingChildren(menuList, (item) => {
            item.key = `key-${key++}`
        })
    }

    traversingChildren = (list, func, parent) => {
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if (parent) {
                item.parent = parent;
            }
            func(item);
            if (item.children && item.children.length) {
                this.traversingChildren(item.children, func, item.key);
            }
        }
    }

    renderPrev = (props) => {
        const pathname = props ? props.history.location.pathname : this.props.history.location.pathname;
        const { directMenu } = this.state
            for (let i = 0, len = directMenu.length; i < len; i++) {
                const { url, key, parent } = directMenu[i];
                if (pathname.indexOf(url) !== -1) {
                    this.setState({
                        selectedKeys: [key]
                    });
                    if (parent) {
                        this.setState({
                            openKeys: [parent]
                        });
                    }
                    return
                }
            }
    }

    getDirectMenu = (list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i]) {
                if (list[i].children && list[i].children.length) {
                    this.getDirectMenu(list[i].children)
                } else {
                    this.setState((preState, props) => ({
                        directMenu: [...preState.directMenu, {
                            url: list[i].url,
                            text: list[i].text,
                            key: list[i].key,
                            parent: list[i].parent ? list[i].parent : ''
                        }]
                    }))
                }
            }
        }
    }

    initMenu = (list = []) => {
        const result = [];
        list.forEach(item => {
            if (item.children && item.children.length) {
                const { openKeys } = this.state;
                result.push(
                    <SubMenu key={item.key} title={
                        <span>
                            <i className="iconfont" dangerouslySetInnerHTML={{ __html: item.icon }}></i>
                            <span>{item.text}</span>
                            <i className={`iconfont`} style={
                                openKeys.includes(item.key) ? {
                                    transform: 'rotateZ(90deg)'
                                } : {}
                            }>&#xe766;</i>
                        </span>
                    }>
                        {
                            this.initMenu(item.children)
                        }
                    </SubMenu>
                )
            } else {
                result.push(
                    <Menu.Item key={item.key} url={item.url}>
                        <span >
                            {
                                item.icon ? (
                                    <i className="iconfont" dangerouslySetInnerHTML={{ __html: item.icon }}></i>
                                ) : null
                            }
                            {
                                item.dot && item.dot === true ?
                                    <span><span className={style.dot}></span>{item.text}</span>
                                    : <span>{item.text}</span>
                            }

                        </span>
                    </Menu.Item>
                )
            }
        })
        return result;
    }

    headerScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop //向上滚动的高度
            const headerTop = document.querySelector('#headerContainer').offsetTop //观察头部容器距离顶部的高度
            if (scrollTop > headerTop) {
                this.setState({
                    fixedactive: true
                })
            } else {
                this.setState({
                    fixedactive: false
                })
            }
    }

    UNSAFE_componentWillMount() {
        this.addKeys(MENUS)
        this.getDirectMenu(MENUS)
        this.setState({
            menus: MENUS
        })
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.renderPrev(props);
    }

    componentDidMount() {
        this.renderPrev();
        window.addEventListener('scroll', this.headerScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.headerScroll)
    }

    render() {
        const { menus, selectedKeys, fixedactive, directMenu } = this.state
        const { className = '', style: propStyle = {} } = this.props

        return (
            <div id="headerContainer" className={`${style.headerContainer} ${className} ${fixedactive === true ? style.fixedactive : ''}`} style={propStyle}>
                <div className={style.brand}>
                    <i className={`iconfont ${style.logo}`}>&#xe754;</i>
                    <div className={style.title}>
                        <p className={style.cn}>这是平台标题</p>
                        <p className={style.en}>XX Platform</p>
                    </div>
                </div>
                <Menu
                    className={style.centermenu}
                    // openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    onClick={this.handleClick}
                    selectedKeys={selectedKeys}
                    mode="horizontal">
                    {this.initMenu(menus)}
                </Menu>
            </div>
        )
    }
}

export default withRouter(Header)