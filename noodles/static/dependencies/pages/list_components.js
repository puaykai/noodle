import React from 'react';
import ReactDOM from 'react-dom';
import {ListItem, List} from 'material-ui/List';

var GenericList = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    render: function(){
    this.props.menu_items.map(function(item){
        console.log("object : " + item);
    });
        if (this.props.menu_items.length > 0){
            return (
                <List>
                    {this.props.menu_items}
                </List>
            );
        } else {
            return (<h4>{this.props.default_empty_message}</h4>);
        }

    }
});

export default GenericList;