import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {ListItem, List} from 'material-ui/List';
import GenericList from './list_components';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

var StudentMainPage = React.createClass({
    componentWillMount: function(){
        var t = this;
        this.props.sendInfo(
            "GET",
            "/tuition/get_due_assignments/",
            {},
            function(xhttp){
                var due_assignments = JSON.parse(xhttp.responseText);
                t.props.sendInfo(
                    "GET",
                    "/tuition/get_completed_assignments/",
                    {},
                    function(xhttpa){
                        var completed_assignments = JSON.parse(xhttpa.responseText);
                        t.setState({
                            dueAssignments:due_assignments,
                            completedAssignments:completed_assignments
                        });
                    },
                    function(xhttpa){
                        var msg = "";
                        if (xhttpa.responseText == "KEY_USER_IS_NOT_A_STUDENT") {
                            msg = "Please try to login again";
                        } else if (xhttpa.responseText == "KEY_BAD_RESPONSE") {
                            msg = "You sent a bad response"
                        }
                        t.props.displaySnackMessage(msg);
                    }
                );
            },
            function(xhttp){
                var msg = "";
                if (xhttp.responseText == "KEY_USER_IS_NOT_A_STUDENT") {
                    msg = "Please try to login again";
                } else if (xhttp.responseText == "KEY_BAD_RESPONSE") {
                    msg = "You send a bad response";
                }
                t.props.displaySnackMessage(msg);
            }
        );

    },
    getInitialState: function(){
        return {
            dueAssignments:[],
            completedAssignments:[]
        };
    },
    getCompletedAssignmentsFromJson: function(jsonList){
        const styles = {
          centerItem: {
            display: 'flex',
            flexDirection: 'row wrap',
            padding: 5,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          }
        };
        var t = this;
        return (jsonList.map(function(jsonOb){
            var reviewAssignment = function(){
            };
            return (
                <ListItem
                    onClick={reviewAssignment}
                    primaryText={jsonOb.name}
                    secondaryText={
                        <div>
                            <span>Due Date</span> :
                            {jsonOb.marks}
                        </div>
                    }
                    secondaryTextLines={2}/>
            );
        }));
    },
    getDueAssignmentsFromJson: function(jsonList){
        const styles = {
          centerItem: {
            display: 'flex',
            flexDirection: 'row wrap',
            padding: 5,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          }
        };
        var t = this;
        return (jsonList.map(function(jsonOb){
            var doAssignment = function(){
                console.log("DUE ASSIGNMENT ID : " + jsonOb.id);
                t.props.changePage("assignment",
                    {
                        "assignment_id":jsonOb.id
                    }
                );
            };
            return (
                <ListItem
                    onClick={doAssignment}
                    primaryText={jsonOb.name}
                    secondaryText={
                        <div>
                            <span>Due Date</span> :
                            {jsonOb.due_date}
                        </div>
                    }
                    secondaryTextLines={2}/>
            );
        }));
    },
    render: function(){
        const styles = {
          headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
          },
          centerItem: {
            width:"60%"
          },
          centerList: {
            display: 'flex',
            flexDirection: 'row wrap',
            padding: 0,
            alignItems:'center',
            justifyContent:'center'
          }

        };

        return (
        <div>
  <Tabs>
    <Tab label="Due Assignments" >
        <GenericList
            default_empty_message={"You do not have any due assignments to do."}
            menu_items={this.getDueAssignmentsFromJson(this.state.dueAssignments)}/>
    </Tab>
    <Tab label="Completed Assignments" >
        <GenericList
            default_empty_message={"You do not have any completed assignments to review."}
            menu_items={this.getCompletedAssignmentsFromJson(this.state.completedAssignments)}/>
    </Tab>
  </Tabs>
  </div>
        );
    }
});

export default StudentMainPage;