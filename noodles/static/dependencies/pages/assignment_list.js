import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from 'material-ui/List';
import TextField from 'material-ui/TextField';
import GenericList from './list_components';
import Assignment from './assignment';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';


var AssignmentsList = React.createClass({
    getInitialState: function(){
        return {};
    },
    getAssignmentListFromJson:function(jsonList){
        return (jsonList.map(function(jsonOb){
            var t = this;
            return (
                <ListItem
                    leftAvatar={<Avatar src={jsonOb.source}/>}
                    primaryText={jsonOb.studentName}
                    secondaryText={
                        <p>
                            <span>{jsonOb.assignmentName}</span>
                        </p>
                        <div>
                            <RaisedButton
                                label="Grade"
                                onClick=function(){
                                    t.sendInfo(); //TODO fetch assignment information
                                    t.changePage("assignment");
                                }/>
                        </div>
                    }
                    secondaryTextLines={2}/>
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
        <div>
        <div style={styles.centerList}><h4>Ungraded Assignments</h4></div>
        <div style={styles.centerList}>
                <TextField
                  hintText="Filter"
                /><br />
        </div>
        <div style={styles.centerList}>
        <GenericList
            default_empty_message="You have no assignments"
            menu_items={
            this.getAssignmentListFromJson([
                {source:"", studentName:"Poh Puay Kai", assignmentName:"Algebra"}
            ])}/>
        </div>
        </div>);
    }
});

export default AssignmentsList;