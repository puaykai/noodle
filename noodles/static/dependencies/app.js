import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import {getMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import LoginPage from './pages/login_sign_up';
import TutorMainPage from './pages/tutor_pages';
import StudentMainPage from './pages/student_pages';
import Header from './pages/header';
import Footer from './pages/footer';
import Profile from './pages/profile';
import LeaderBoard from './pages/leaderboard';
import TutorList from './pages/tutor_list';
import NewAssignmentPage from './pages/new_assignment';
import AssignmentsList from './pages/assignment_list';
import Assignment from './pages/assignment';
import RequestingStudentsPage from './pages/requesting_students';

var $ = require('jquery');

var AlloyEditor = require('alloyeditor');

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var App = React.createClass({
    componentDidMount: function(){},
    getInitialState: function(){
        return {
            current_page: <LoginPage
                            changePage={this.changePage}
                            sendInfo={this.sendInfo}
                            displaySnackMessage={this.displaySnackMessage}/>,
            header: <Header
                        changePage={this.changePage}
                        sendInfo={this.sendInfo}
                        menuItems={[
                            <MenuItem
                                primaryText="About Us"
                                onClick={function(){}}/>,
                            <MenuItem
                                primaryText="Help"
                                onClick={function(){}}/>
                        ]}/>,
            openSnackBar:false,
            message:"",
            xhttp: new XMLHttpRequest()
        };
    },
    handleSnackOpen:function(){this.setState({openSnackBar:true})},
    handleSnackClose:function(){this.setState({openSnackBar:false})},
    changeSnackMessage:function(message){this.setState({message:message})},
    displaySnackMessage:function(message){
        this.setState({
            openSnackBar:true,
            message:message
        });
    },
    sendInfo:function(method, url, message, callback, error_callback){
        var xhttp = this.state.xhttp;
        var t = this;
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                callback(xhttp);
            } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                error_callback(xhttp);
            } else if (xhttp.readyState != 4 ) {
                // TODO blank out the whole website
            }
        }
        var token = getCookie('csrftoken');
        xhttp.open(method, url, true);
//        var params = Object.keys(message).map(function(k){
//            return encodeURIComponent(k) + "=" + encodeURIComponent(message[k]);
//        }).join('&');
//        console.log(params);
//        this.state.xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.state.xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        this.state.xhttp.setRequestHeader("X-CSRFToken", token);
        this.state.xhttp.send(JSON.stringify(message));
    },
    changePage: function(page_name){
        if (page_name == "tutor_main") {
            var t = this;
            var studentList = [];
            var assignmentList = [];
            this.sendInfo(
                "GET",
                "/tuition/get_ungraded_assignments/",
                function(xhttp){
                    assignmentList = JSON.parse(xhttp.responseContent);
                },
                function(xhttp){
                    t.displaySnackMessage("There was some problem retrieving your assignments. Please login and try again.");
                }
            );
            this.sendInfo(
                "GET",
                "/tuition/get_students/",
                function(xhttp){
                    studentList = JSON.parse(xhttp.responseContent);
                },
                function(xhttp){
                    t.displaySnackMessage("There was some problem retrieving your students. Please login and try again.")
                }
            );
            this.setState({
            "current_page":<TutorMainPage
                                changePage={this.changePage}
                                sendInfo={this.sendInfo}
                                studentList={studentList}
                                assignmentList={assignmentList}/>,
            "header":<Header
                        changePage={this.changePage}
                        sendInfo={this.sendInfo}
                        menuItems={[
                            <MenuItem
                                primaryText="Main"
                                onClick={function(){
                                    t.changePage("tutor_main");
                                }}/>,
                            <MenuItem
                                primaryText="Profile"
                                onClick={function(){
                                    t.changePage("profile");
                                }}/>,
                            <MenuItem
                                primaryText="New Assignment"
                                onClick={function(){
                                    t.changePage("new_assignment");
                                }}/>,
                            <MenuItem
                                primaryText="Ungraded Assignment"
                                onClick={function(){
                                    t.changePage("ungraded_assignment");
                                }}/>,
                            <MenuItem
                                primaryText="Requesting Student"
                                onClick={function(){
                                    t.changePage("requesting_students");
                                }}/>,
                            <MenuItem
                                primaryText="Sign out"
                                onClick={function(){
                                    t.sendInfo(
                                        "POST",
                                        "/tuition/logout/",
                                        {},
                                        function(){
                                            t.changePage("login");
                                            t.displaySnackMessage("Logout was successful");
                                        },
                                        function(){
                                            t.displaySnackMessage("Logout was not successful") ;
                                        }
                                    );

                                }}/>
                        ]}/>
            });
        } else if (page_name == "student_main") {
            var t = this;
            // TODO
            this.sendInfo(
                "GET",
                "/tuition/get_due_assignments/",
                function(xhttp){// TODO
                },
                function(xhttp){// TODO
                }
            );
            // TODO
            this.sendInfo(
                "GET",
                "/tuition/get_completed_assignments/",
                function(xhttp){// TODO
                },
                function(xhttp){// TODO
                }
            );
            this.setState({
            "current_page":<StudentMainPage
                                changePage={this.changePage}
                                sendInfo={this.sendInfo}/>,
            "header":<Header
                        changePage={this.changePage}
                        sendInfo={this.sendInfo}
                        menuItems={[
                            <MenuItem
                                primaryText="Main"
                                onClick={function(){
                                    t.changePage("student_main");
                                }}/>,
                            <MenuItem
                                primaryText="Profile"
                                onClick={function(){
                                    t.changePage("profile");
                                }}/>,
                            <MenuItem
                                primaryText="LeaderBoard"
                                onClick={function(){
                                    t.changePage("leaderboard");
                                }}/>,
                            <MenuItem
                                primaryText="Tutors"
                                onClick={function(){
                                    t.changePage("tutor_list");
                                }}/>,
                            <MenuItem
                                primaryText="Sign out"
                                onClick={function(){
                                    t.sendInfo(
                                        "POST",
                                        "/tuition/logout/",
                                        {},
                                        function(){
                                            t.changePage("login");
                                            t.displaySnackMessage("Logout was successful");
                                        },
                                        function(){
                                            t.displaySnackMessage("Logout was not successful") ;
                                        }
                                    );

                                }}/>
                        ]}/>
            });
        } else if (page_name == "new_assignment") {
            this.setState({"current_page":<NewAssignmentPage
                                            sendInfo={this.sendInfo}
                                            changePage={this.changePage}
                                            displaySnackMessage={this.displaySnackMessage}/>});
        } else if (page_name == "assignment_list") {
            // TODO
            this.sendInfo(
                "GET",
                "/tuition/get_assignments/",
                function(xhttp){// TODO
                },
                function(xhttp){// TODO
                }
            );
            this.setState({"current_page":<AssignmentsList
                                            sendInfo={this.sendInfo}
                                            changePage={this.changePage}/>});
        } else if (page_name == "assignment") {
            //TODO
            this.setState({"current_page":<Assignment
                                            sendInfo={this.sendInfo}
                                            changePage={this.changePage}/>});
        } else if (page_name == "login") {
            this.setState({
            "current_page":<LoginPage
                                sendInfo={this.sendInfo}
                                changePage={this.changePage}
                                displaySnackMessage={this.displaySnackMessage}/>,
            "header":<Header
                        sendInfo={this.sendInfo}
                        changePage={this.changePage}
                        menuItems={[
                            <MenuItem
                                primaryText="About Us"
                                onClick={function(){}}/>,
                            <MenuItem
                                primaryText="Help"
                                onClick={function(){}}/>
                        ]}/>});
        } else if (page_name == "ungraded_assignment") {
            this.setState({"current_page":<Assignment
                                            sendInfo={this.sendInfo}
                                            changePage={this.changePage}/>});
        } else if (page_name == "leaderboard") {
            this.setState({"current_page":<LeaderBoard
                                            sendInfo={this.sendInfo}
                                            changePage={this.changePage}/>});
        } else if (page_name == "tutor_list") {
            var tutorList = [];
            var t = this;
            this.sendInfo(
                "GET",
                "/tuition/get_tutors/",
                {},
                function(xhttp){
                    tutorList = JSON.parse(xhttp.responseContent);
                },
                function(xhttp){
                    t.displaySnackMessage("Did not manage to get snack message");
                }
            );
            this.setState({"current_page":<TutorList
                                            sendInfo={this.sendInfo}
                                            changePage={this.changePage}
                                            displaySnackMessage={this.displaySnackMessage}
                                            tutorList={tutorList}/>});
        } else if (page_name == "profile") {
            this.setState({"current_page":<Profile
                                            sendInfo={this.sendInfo}
                                            changePage={this.changePage}/>});
        } else if (page_name == 'requesting_students') {
            this.setState({"current_page":<RequestingStudentsPage
                                            sendInfo={this.sendInfo}
                                            changePage={this.changePage}/>});
        }
    },
    render: function(){
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    {this.state.header}
                    {this.state.current_page}
                    <Footer/>
                    <Snackbar
                        open={this.state.openSnackBar}
                        message={this.state.message}
                        autoHideDuration={3000}
                        onRequestClose={this.handleSnackClose}/>
                </div>
            </MuiThemeProvider>
        );
    }
});

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
ReactDOM.render(
  (<App/>)
  ,
	document.getElementById('content'));