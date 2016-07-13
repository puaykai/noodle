import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

var $ = require('jquery');

var AlloyEditor = require('alloyeditor');

var Assignment = React.createClass({
    getInitialState: function(){
        return {
            questions:[],
            currentPageNum:0,
            currentPage:null,
            openDialog:false,
            canNavigate:false,
            nextNavigatePage:"",
            pageState:"REVIEW"
        };
    },
    handleOpenDialog:function(){
        this.setState({openDialog:true});
    },
    handleCloseDialogPositive:function(){
        this.setState({
            openDialog:false,
            canNavigate:true
        });
        var a = {
            "assignment_id":this.props.pageParams.assignment_id,
            "answers":[]
        };
        if (this.props.pageParams.student_id != null) {
            a['student_id'] = this.props.pageParams.student_id;
        }
        if(this.state.pageState == "REVIEW") { // TODO not implemented in this version

        } else if(this.state.pageState == "GRADE") { //grading question
            for(var i=0; i<this.state.questions.length; i++) {
                var question = this.state.questions[i];
                a.answers.push({
                    "question_id":question.id,
                    "grade":question.grade,
                    "comment":question.comment
                });
                console.log("question_id : " + question.id + "\r\n grade: " + question.grade + " \r\n comment: " + question.comment);
            }
            var t = this;
            this.props.sendInfo(
                "POST",
                "/tuition/grade_assignment/",
                a,
                function(xhttp){
                    console.log("grade assignment return : " + xhttp.responseText);
                    t.props.displaySnackMessage("You have successfully graded that assignment");
                },
                function(xhttp){
                    var msg = "";
                    if (xhttp.responseText == "KEY_YOU_ARE_NOT_TUTOR") {
                        msg = "Please refresh and login again";
                    } else if (xhttp.responseText == "KEY_NO_SUCH_ASSIGNMENT") {
                        msg = "There is no such assignment, please go to main page and try again";
                    } else if (xhttp.responseText == "KEY_NO_SUCH_STUDENT") {
                        msg = "The student has been deleted";
                    } else if (xhttp.responseText == "KEY_STUDENT_DOES_NOT_HAVE_ASSIGNMENT") {
                        msg = "This student does not have this assignment"
                    } else if (xhttp.responseText == "KEY_MISSING_PARAMS") {
                        msg = "Some parameters are missing"; //TODO bad message
                    } else if (xhttp.responseText == "KEY_BAD_REQUEST") {
                        msg = "You have sent a bad request";
                    }
                    t.props.displaySnackMessage(msg);
                }
            );
        } else { // doing question
            for (var i=0; i<this.state.questions.length; i++) {
                var question = this.state.questions[i];
                a.answers.push({
                    "question_id":question.id,
                    "answer":question.answer
                });
                console.log("question_id : " + question.id + "\r\n answer: " + question.answer );
            }
            console.log("a : " + a.answers);
            var t = this;
            this.props.sendInfo(
                "POST",
                "/tuition/do_assignment/",
                a,
                function(xhttp){
                    console.log("do assignment return : " + xhttp.responseText);
                    t.props.displaySnackMessage("You have successfully completed that assignment!");
                },
                function(xhttp){
                    var msg = "";
                    if (xhttp.responseText == "KEY_BAD_REQUEST"){
                        msg = "You send a bad request"
                    } else if (xhttp.responseText == "SAVE_ASSIGNMENT_FAILED") {
                        msg = "You have failed to save assignment, please try again.";
                    }
                    t.props.displaySnackMessage(msg);
                }
            );
        }
        this.props.changePage(this.state.nextNavigatePage);
    },
    handleCloseDialogNegative:function(){
        this.setState({openDialog:false});
    },
    handleBeforeNavigateAway:function(page_name, page_params){
        this.handleOpenDialog();
        this.setState({nextNavigatePage:page_name});
        return this.state.canNavigate;
    },
    componentDidMount: function(){
        this.props.preventDefault(this.handleBeforeNavigateAway);
    },
    componentWillMount: function(){
            console.log("ASSIGNMENT : " + this.props.pageParams.assignment_id);
            var t = this;
            var page_state = "REVIEW"; //states are either REVIEW, GRADE, DO
            this.props.sendInfo(
                "POST",
                "/tuition/get_assignment/",
                {"assignment_id":this.props.pageParams.assignment_id},
                function(xhttp){
                    console.log("ASSIGNMENT response good: " + xhttp.responseText);
                    var q = [];
                    var r = JSON.parse(xhttp.responseText);
                    var assignment_name = r.name;
                    r = r.questions;
                    for (var i=0; i<r.length; i++) {
                        var a = {};
                        console.log(a);
                        a['id'] = r[i]['questions__id'];
                        a['question'] = r[i]['questions__content'];
                        a['maxScore'] = r[i]['questions__maximum_grade'];
                        console.log(JSON.stringify(r[i]));
                        console.log("question : " + a['question'] + " maxScore : " + a['maxScore'] + " isGraded : " + r[i]['questions__answer__graded']);
                        if (r[i]['questions__answer__graded'] == false && r[i]['questions__answer__content'] == "") {
                            a['isGraded'] = false;
                            a['isAnswered'] = false;
                            page_state = "DO";
                        } else if (r[i]['questions__answer__graded'] == false) {
                            a['isAnswered'] = true;
                            a['isGraded'] = false;
                            a['answer'] = r[i]['questions__answer__content'];
                            page_state = "GRADE";
                        } else {
                            a['isAnswered'] = true;
                            a['isGraded'] = true;
                            a['answer'] = r[i]['questions__answer__content'];
                            a['score'] = r[i]['questions__answer__grade'];
                            a['comment'] = r[i]['questions__answer__comment'];
                            page_state = "REVIEW";
                        }
                        q.push(a);
                    }
                    t.setState({
                        questions:q,
                        currentPage:t.getObjectFromJson(q[0], 0),
                        pageState:page_state
                    });
                },
                function(xhttp){
                    console.log("ASSIGNMENT response bad : " + xhttp.responseText);
                    t.props.displaySnackMessage("You sent a bad request");
                }
            );
    },
    getObjectFromJson: function(json, pageNum){

        console.log("isGraded : " + json.isGraded + " is Answered : " + json.isAnswered);

        const style = {
            display: 'flex',
            padding: 3,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        };
        const buttonStyle = {
            margin: 12,
        };
        var t = this;
        if(json.isAnswered && json.isGraded){ //for review only
            console.log("For review only");
            var firstPart = (<div>
                <h4>Answer:</h4>
                <div>>{json.answer}</div></div>);
            var secondPart = (
                <div>
                <h4>Comment:</h4>
                    <div>
                        <p>{json.score} of {json.maxScore}</p>
                    </div>
                    <div>
                        <p>{json.comment}</p>
                    </div>
                </div>
            );
        } else if(json.isAnswered) { //isAnswered but not graded
            console.log("is answered but not graded");
            var firstPart=(

            <div><h4>Answer:</h4>
            <div>{json.answer}</div></div>);
            var hintText = "Enter a grade out of " + json.maxScore;
            var content_id = "editableContent-"+pageNum;
            var secondPart=(
                <div>
                    <div>
                        <TextField
                            id={"grade"+content_id}
                            hintText={hintText}
                            floatingLabelText="Enter score"
                            floatingLabelFixed={true}
                            value={json.grade}
                        />
                    </div>
                <h4>Comment:</h4>
                    <div>
                        <div id={content_id} ref={
                            function(input){
                                if(input != null) { //TODO put grade and comment on this question
                                    document.getElementById(input.id).innerHTML = t.state.questions[t.state.currentPageNum].comment;
                                    try{
                                        AlloyEditor.editable(input.id, {
                                            container: 'editable'
                                        });
                                    } catch (err) {
                                        console.log(err);
                                    }
                                }
                            }
                        }>
                            <p>Click here to enter comment</p>
                        </div>
                    </div>
                </div>
            );
        } else { // is not answered, since once graded is considered answered
            console.log("is not answered ");
            var content_id = "editableContent-"+pageNum;
            console.log("content_id : " + content_id);
            var firstPart=(
            <div>
                <h4>Answer:</h4>
                <div id={content_id} ref={
                function(input){
                    if(input != null) { // This happens when objects gets dereferenced
                        console.log("calling ref current question : " + t.state.currentPageNum);
                        document.getElementById(input.id).innerHTML = t.state.questions[t.state.currentPageNum].answer;
                        console.log("setting" + input.id + " to " + t.state.questions[t.state.currentPageNum].answer);
                        try{
                            AlloyEditor.editable(input.id, {
                                container: 'editable'
                            });
                        } catch(err) {
                            console.log(err);
                        }
                    }
                }
            }><p>Click here to edit your answer</p>
            </div>
            </div>);
            var secondPart=(<div></div>);
        }

        console.log("assignment render question : " + json.question);

        return (
        <Paper
            style={style}
            zDepth={1}
            children={
            <div>
            <div>
            <h4>Question: </h4>
            {json.question}
            </div>
            <Divider/>
            {firstPart}
            <Divider/>
            {secondPart}
            <RaisedButton
                label="Next"
                style={buttonStyle}
                onTouchEnd={this.goToNextPage}
                onClick={this.goToNextPage}/>
            </div>
        }/>

        );
    },
    goToNextPage: function(){
        console.log("triggered go to next page");
        // TODO if tutor , then save grades and comments
        // TODO if student , then save answer
        //Save the answer and set new answer
        if (this.state.pageState == "DO") {
            this.state.questions[this.state.currentPageNum].answer = document.getElementById("editableContent-"+this.state.currentPageNum).innerHTML;
        } else if (this.state.pageState == "GRADE") {
            this.state.questions[this.state.currentPageNum].comment = document.getElementById("editableContent-"+this.state.currentPageNum).innerHTML;
            this.state.questions[this.state.currentPageNum].grade = document.getElementById("gradeeditableContent-"+this.state.currentPageNum).value;
        }
        var nextPageNumber = (this.state.currentPageNum + 1) % this.state.questions.length;
        var nextQuestion = this.getObjectFromJson(this.state.questions[nextPageNumber], nextPageNumber);
        this.setState({
            currentPageNum:nextPageNumber,
            currentPage:nextQuestion
        });
        console.log("trigger to go next page : " + this.state.currentPageNum);
    },
    componentWillUnmount: function(){
    },
    render: function(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseDialogNegative}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseDialogPositive}
      />,
    ];
    var dialogTitle = "";
    var dialogMessage = "";
    if (this.state.pageState == "REVIEW") {
        dialogTitle = "";
        dialogMessage = "";
    } else if (this.state.pageState == "DO") {
        dialogTitle = "Confirm Navigate Away?";
        dialogMessage = "Navigating away will submit this assignment as your final answer. Are you sure?";
    } else if (this.state.pageState == "GRADE") {
        dialogTitle = "Confirm Navigate Away?";
        dialogMessage = "Navigating away will fix this as final grade and comments. Are you sure?";
    }
        console.log("current page number on render : " + this.state.currentPageNum);
        return (<div>
              <div>
                <Dialog
                  title={dialogTitle}
                  actions={actions}
                  modal={true}
                  open={this.state.openDialog}
                  onRequestClose={this.handleCloseDialogNegative}
                >
                  {dialogMessage}
                </Dialog>
              </div>
        {this.state.currentPage}

        </div>);
    }
});

export default Assignment;