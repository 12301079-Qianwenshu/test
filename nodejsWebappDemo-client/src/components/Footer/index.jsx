import React, { Component } from 'react';
import style from './style.scss'

class Footer extends Component {

    render() {
        const { className = '', style: propStyle = {} } = this.props

        return (
            <div className={`${style.footerContainer} ${className}`} style={propStyle}>
                这是Footer
            </div>
        );
    }
}

export default Footer; 