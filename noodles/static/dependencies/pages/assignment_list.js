import React from 'react';
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import GenericList from './list_components';
import Assignment from './assignment';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';


var AssignmentsList = React.createClass({
    getInitialState: function(){
        return {
            ungraded_assignment:[]
        };
    },
    componentWillMount:function(){
        var assignmentList = [];
        var t = this;
        this.props.sendInfo(
            "GET",
            "/tuition/get_ungraded_assignment/",
            {},
            function(xhttp){
                var ungraded_assignment = [];
                var a = JSON.parse(xhttp.responseText);
                for (var i=0; i<a.length; i++) {
                    var b = {};
                    b['assignment_id'] = a[i].assignment__id;
                    b['assignment_name'] = a[i].assignment__name;
                    b['student_id'] = a[i].student__id;
                    b['student_name'] = a[i].student__user__username;
                    b['avatar'] = a[i].student__user__profile__avatar;
                    ungraded_assignment.push(b);
                }
                t.setState({'ungraded_assignment':ungraded_assignment});
            },
            function(xhttp){
                if (xhttp.responseText == "KEY_BAD_REQUEST") {
                    t.props.displaySnackMessage("The request is bad");
                }
            }
        );
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
            var gradeAssignment = function(){
                console.log("going to assignment " + jsonOb.assignment_id + " / student " + jsonOb.student_id);
                t.props.changePage("assignment", {
                    "assignment_id":jsonOb.assignment_id,
                    "student_id":jsonOb.student_id
                });
            };
            return (
                <ListItem
                    leftAvatar={<Avatar src={jsonOb.avatar}/>}
                    primaryText={jsonOb.student_name}
                    secondaryText={
                    <div>
                        <p>
                            <span>{jsonOb.assignment_name}</span>
                        </p>
                    </div>
                    }
                    secondaryTextLines={2}
                    onClick={gradeAssignment}/>
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
            this.getAssignmentListFromJson(
            this.state.ungraded_assignment
            )}/>
        </div>
        </div>);
    }
});

export default AssignmentsList;