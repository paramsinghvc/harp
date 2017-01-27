import React, { Component } from 'react';

let styles = {
    footer: {
        height: 100,
        background: 'rgb(37, 37, 37)',
        position: 'relative',
        marginTop: 50,
        marginBottom: 0,
        bottom: 0,
        width: '100%',
        color: '#fff'
    },
    bar: {
        width: '100%',
        height: 5,
        background: '#00d95f',
        position: 'absolute',
        bottom: 0
    },
    appName: {
        fontSize: 12,
        position: 'absolute',
        bottom: 11,
        left: 11,
        color: '#888888'
    }
}
export default class Footer extends Component {
    render() {
        return (
            <footer style={styles.footer}>  
                <p style={styles.appName}>{this.props.appName} &copy; All Rights Reserved.</p>
                <div style={styles.bar}></div>
            </footer>
        )
    }
}
