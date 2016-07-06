import React from 'react';
import ReactDOM from 'react-dom';
import List from 'material-ui/List';

var GenericList = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    render: function(){
    console.log("length of menu_items : " + this.props.menu_items.length);
    console.log("default message : " + this.props.default_empty_message);
    console.log("menu_items : "+ this.props.menu_items[0]);
        if (this.props.menu_items.length > 0){
            return (
                <List>
                    {this.props.menu_items.map(function(item){return item;})}
                </List>
            );
        } else {
            return (<h4>{this.props.default_empty_message}</h4>);
        }

    }
});

export default GenericList;