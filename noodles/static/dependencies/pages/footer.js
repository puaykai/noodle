import React from 'react';
import ReactDOM from 'react-dom';

var Footer = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function(){
        const style = {
            display: 'flex',
            flexDirection: 'row wrap',
            padding: 10,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }

        return (
            <div style={style}>
                <a>About us</a>
                <a>Terms of use</a>
                <a>Careers</a>
            </div>
        );
    }
});

export default Footer;