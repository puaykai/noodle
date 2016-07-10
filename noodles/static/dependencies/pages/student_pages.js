import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import ListItem from 'material-ui/List';
import GenericList from './list_components';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

var StudentMainPage = React.createClass({
    componentWillMount: function(){
        var t = this;
        this.props.sendInfo(
            "GET",
            "/tuition/get_due_assignments/",
            function(xhttp){
                console.log("raw due assignments : " + xhttp.responseText);
                var due_assignments = JSON.parse(xhttp.responseText);
                console.log("due_assignments : " + due_assignments);
                t.props.sendInfo(
                    "GET",
                    "/tuition/get_completed_assignments/",
                    function(xhttpa){
                        var completed_assignments = JSON.parse(xhttpa.responseText);
                        console.log("Due assignments : " + due_assignments);
                        console.log("Completed assignments : " + completed_assignments);
                        t.setState({
                            due_assignments:due_assignments,
                            completed_assignments:completed_assignments
                        });
                    },
                    function(xhttpa){
                        t.props.displaySnackMessage("Cannot get your completed assignments");
                    }
                );
            },
            function(xhttp){
                t.props.displaySnackMessage("Cannot get your due assignments");
            }
        );

    },
    getInitialState: function(){
        return {
            due_assignments:[],
            completed_assignments:[]
        };
    },
    getCompletedAssignmentsFromJson: function(jsonList){
        var t = this;
        return (jsonList.map(function(jsonOb){
            var reviewAssignment = function(){
                document.getElementById("studentMainReviewAssignmentSpinner").style.display = "block";
                document.getElementById("studentMainReviewAssignmentButton").style.display = "none";

            };
            return (
                <ListItem
                    primaryText={jsonOb.name}
                    secondaryText={
                        <div>
                        <p>
                            <span>Due Date</span> :
                            {jsonOb.marks}
                        </p>
                        <CircularProgress
                            id="studentMainReviewAssignmentSpinner"
                            ref={function(input){
                                if(input != null) {
                                    document.getElementById("studentMainReviewAssignmentSpinner").style.display="none";
                                }
                            }}/>
                        <RaisedButton
                            id="studentMainReviewAssignmentButton"
                            label="Review Assignment"
                            onClick={reviewAssignment}/>
                        </div>
                    }/>
            );
        }));
    },
    getDueAssignmentsFromJson: function(jsonList){
        var t = this;
        return (jsonList.map(function(jsonOb){
            var doAssignment = function(){
                document.getElementById("studentMainDoAssignmentSpinner").style.display = "block";
                document.getElementById("studentMainDoAssignmentButton").style.display = "none";
            };
            return (
                <ListItem
                    primaryText={jsonOb.name}
                    secondaryText={
                        <div>
                        <p>
                            <span>Due Date</span> :
                            {jsonOb.dueDate}
                        </p>
                        <CircularProgress
                            id="studentMainDoAssignmentSpinner"
                            ref={function(input){
                                if(input != null) {
                                    document.getElementById("studentMainDoAssignmentSpinner").style.display="none";
                                }
                            }}/>
                        <RaisedButton
                            id="studentMainDoAssignmentButton"
                            label="Do Assignment"
                            onClick={doAssignment}/>
                        </div>
                    }/>
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
            default_empty_message={"You do not have any due assignments."}
            menu_items={[]}/>
    </Tab>
    <Tab label="Completed Assignments" >
        <GenericList
            default_empty_message={"You do not have any completed assignments"}
            menu_items={[]}/>
    </Tab>
  </Tabs>
  </div>
        );
    }
});

export default StudentMainPage;