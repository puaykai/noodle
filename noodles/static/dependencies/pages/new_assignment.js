import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

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
        var id_name = "editableContent"+i;
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
                            hintText="Maximum grade"
                            floatingLabelText="Maximum points for this question"/>
                    </div>
                }/>
                );
        }
        this.setState({questions:q});
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
                    <div><RaisedButton label="Save" style={buttonStyle} /></div>
                </div>}/>
        );
    }
});

export default NewAssignmentPage;