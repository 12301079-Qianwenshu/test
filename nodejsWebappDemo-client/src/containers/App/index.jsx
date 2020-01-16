import React, { Component } from 'react';
import style from './style.scss'
import { Header, Footer } from 'components';

class App extends Component {
    render() {
        return (
            <div className={style.app}>
                <Header className={style.header} />
                <div className={style.children}>{this.props.children}</div>
                <Footer />
            </div>
        );
    }
}

export default App;