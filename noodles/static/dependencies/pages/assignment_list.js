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
        var t = this;
        var grade_assignment = function(){
            this.props.sendInfo(
                "GET",
                "/tuition/get_assignments/",
                {},
                function(xhttp){
                    console.log("get assignments : " + xhttp.responseText);
                },
                function(xhttp){
                    console.log("get assignments error : " + xhttp.responseText);
                }
            );
            this.props.changePage("assignment");
        };
        return (jsonList.map(function(jsonOb){
            return (
                <ListItem
                    leftAvatar={<Avatar src={jsonOb.source}/>}
                    primaryText={jsonOb.studentName}
                    secondaryText={
                    <div>
                        <p>
                            <span>{jsonOb.assignmentName}</span>
                        </p>
                        <div>
                            <RaisedButton
                                label="Grade"
                                onClick={grade_assignment}/>
                        </div>
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