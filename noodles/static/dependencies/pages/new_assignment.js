import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

var $ = require('jquery');

var AlloyEditor = require('alloyeditor');

var NewAssignmentPage = React.createClass({
    getInitialState: function(){
        return {
            questions:[]
        };
    },
    changeNumberOfQuestions: function(){
        var numberOfQuestions = document.getElementById("numberOfQuestionsInAssignment").value;
        const style = {
            display: 'flex',
            padding: 3,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        };
        var q = [];
        for (var i = 0; i < numberOfQuestions; i++) {
        var id_name = "newAssignmentEditableContent"+i;
          q.push(
          <Paper style={style}
                zDepth={2}
                children={
                    <div>
                        <h4>Question {i}</h4>
                        <div id={id_name} ref={
                            function(input){
                                if (input != null) { // This happens when object gets dereferenced
                                    AlloyEditor.editable(input.id, {
                                        container: 'editable'
                                    });
                                }
                            }
                        }>
                            <h4>Click to edit this question</h4>
                        </div>
                        <TextField
                            id={"grade"+id_name}
                            type="number"
                            hintText="Maximum grade"
                            floatingLabelText="Maximum points for this question"/>
                    </div>
                }/>
                );
        }
        this.setState({questions:q});
    },
    saveAssignment: function(){
        document.getElementById("new_assignment_save_button_id").style.display="none";
        document.getElementById("new_assignment_progress_circle_id").style.display="block";
        var q = []
        for (var i=0; i<this.state.questions.length; i++) {
            var id_name = "newAssignmentEditableContent"+i;
            var grade_id_name = "gradenewAssignmentEditableContent"+i;
            q.push({
                "content":document.getElementById(id_name).textContent,
                "maximum_grade":document.getElementById(grade_id_name).value
            });
        }
        var t = this;
        this.props.sendInfo(
            "POST",
            "/tuition/new_assignment/",
            {
                "questions":q
            },
            function(xhttp){
                t.props.displaySnackMessage("Your assignment has been saved!");
                document.getElementById("new_assignment_save_button_id").style.display="block";
                document.getElementById("new_assignment_progress_circle_id").style.display="none";
            },
            function(xhttp){
                var msg = "";
                if (xhttp.responseContent == "KEY_NOT_A_TUTOR") {
                    msg = "You are not a tutor. Please login again";
                    t.props.displaySnackMessage(msg);
                    t.props.changePage("login")
                } else if (xhttp.responseContent == "KEY_EMPTY_ASSIGNMENT_DICTIONARY") {
                    msg = "You did not have any questions";
                } else if (xhttp.responseContent == "KEY_BAD_REQUEST") {
                    msg = "You sent a bad request";
                }
                t.props.displaySnackMessage(msg);
                document.getElementById("new_assignment_save_button_id").style.display="block";
                document.getElementById("new_assignment_progress_circle_id").style.display="none";
            }
        );
    },
    render: function(){
        const style = {
            display: 'flex',
            padding: 3,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        };
        const buttonStyle = {
            margin: 12
        };
        return (
                <Paper style={style}
                zDepth={1}
                children={<div>
                    <div style={style}>
                        <TextField
                          hintText="Enter Assignment Name"
                          maxlength="255"
                          floatingLabelText="Click to set assignment name"
                          floatingLabelFixed={true} />
                        <DatePicker
                            floatingLabelText="Assignment Due Date"
                            hintText="Click to set assignment due date"
                            mode="landscape" />
                        <TextField
                          id="numberOfQuestionsInAssignment"
                          type="number"
                          hintText="Enter Number of questions"
                          floatingLabelText="Click to set number of questions"
                          onChange={this.changeNumberOfQuestions}
                          floatingLabelFixed={true} />
                    </div>
                    <div>
                    {this.state.questions}
                    </div>
                    <div>
                    <div
                        id="new_assignment_save_button_id">
                    <RaisedButton
                        label="Save"
                        style={buttonStyle}
                        onClick={this.saveAssignment}/>
                    </div>
                    <div
                        id="new_assignment_progress_circle_id">
                    <CircularProgress
                        ref={function(input){
                            if(input != null) {
                                document.getElementById("new_assignment_progress_circle_id").style.display="none";
                            }
                        }}/>
                    </div>
                    </div>
                </div>}/>
        );
    }
});

export default NewAssignmentPage;