import React from 'react';
import ReactDOM from 'react-dom';
import GenericList from './list_components';

var RequestingStudentsPage = React.createClass({
    getInitialState: function(){
        return {};
    },
    getRequestingStudentsFromJson: function(jsonList){
        return (jsonList.map(function(jsonOb){
            return (
                <ListItem
                    leftAvatar={<Avatar src={jsobOb.source}/>}
                    primaryText={jsonOb.name}/>
            );
        }));
    },
    render: function(){

    const styles = {
        centerList: {
            display: 'flex',
            flexDirection: 'row wrap',
            padding: 10,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }
    };
        return (
            <div style={styles.centerList}>
                <h4>Requesting Students</h4>
                <GenericList
                    default_empty_message="You do no have requesting students"
                    menu_items={
                        this.getRequestingStudentsFromJson([
                        {source:"", name:"Kim Mui"}
                        ])
                    }/>
            </div>
        );
    }
});

export default RequestingStudentsPage;