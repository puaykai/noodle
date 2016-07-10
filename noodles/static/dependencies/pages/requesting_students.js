import React from 'react';
import ReactDOM from 'react-dom';
import GenericList from './list_components';
import {ListItem, List} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';


var RequestingStudentsPage = React.createClass({
    componentWillMount:function(){
        var t = this;
        this.props.sendInfo(
            "GET",
            "/tuition/get_requesting_students/",
            {},
            function(xhttp){
                console.log("requesting students raw : " + xhttp.responseText);
                var requesting_students = JSON.parse(xhttp.responseText);
                console.log("requesting students : " + requesting_students);
                t.setState({
                    requestingStudents: requesting_students
                });
            },
            function(xhttp) {
                if (xhttp.responseText == "KEY_NOT_A_TUTOR") {
                    t.props.displaySnackMessage("Please try and login again");
                } else if (xhttp.responseText == "KEY_BAD_REQUEST") {
                    t.props.displaySnackMessage("This is a bad request");
                }
            }
        );
    },
    getInitialState: function(){
        return {
            requestingStudents:[]
        };
    },
    getRequestingStudentsFromJson: function(jsonList){
        var t = this;
        return (jsonList.map(function(jsonOb){
            var student_id = jsonOb.id;
            console.log("student id " + student_id);
            var acceptStudent = function(){
                document.getElementById("requestingStudentAcceptStudentButton").style.display = "none";
                document.getElementById("requestingStudentAcceptStudentSpinner").style.display = "block";
                t.props.sendInfo(
                    "POST",
                    "/tuition/accept_student/",
                    {"student_id" : student_id},
                    function(xhttp){
                        t.props.displaySnackMessage("You have successfully added student!");
                        document.getElementById("requestingStudentAcceptStudentSpinner").style.display = "none";
                    },
                    function(xhttp){
                        var msg = "";
                        if (xhttp.responseText == "KEY_NO_SUCH_STUDENT") {
                            msg = "There is no such student. Please try login again.";
                        } else if (xhttp.responseText == "KEY_NO_SUCH_TUTOR") {
                            msg = "Please login and try again";
                        } else if (xhttp.responseText == "KEY_STUDENT_DID_NOT_REQUEST_FOR_TUTOR") {
                            msg = "Student has removed you as requested tutor, please click on requesting students page again";
                        } else if (xhttp.responseText == "KEY_BAD_REQUEST") {
                            msg = "You have sent a bad request";
                        }
                        t.props.displaySnackMessage(msg);
                        document.getElementById("requestingStudentAcceptStudentButton").style.display = "block";
                        document.getElementById("requestingStudentAcceptStudentSpinner").style.display = "none";
                    }
                );
            }
            return (
                <ListItem
                    leftAvatar={<Avatar src={jsonOb.user__profile__avatar}/>}
                    primaryText={<div>
                    <span>{jsonOb.user__username}</span>
                    <CircularProgress
                        id="requestingStudentAcceptStudentSpinner"
                        ref={function(input){
                            if(input != null) {
                                document.getElementById("requestingStudentAcceptStudentSpinner").style.display="none";
                            }
                        }}/>
                    <RaisedButton
                        id="requestingStudentAcceptStudentButton"
                        label="Accept"
                        onClick={acceptStudent}/></div>}
                    />
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
                <h4>Requesting Students</h4>
                <GenericList
                    default_empty_message="You do not have requesting students"
                    menu_items={
                        this.getRequestingStudentsFromJson(
                        this.state.requestingStudents
                        )
                    }/>
            </div>
        );
    }
});

export default RequestingStudentsPage;