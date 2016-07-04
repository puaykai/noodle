import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import CircularProgress from 'material-ui/CircularProgress';

var LoginPage = React.createClass({
    getInitialState: function(){
        return {
            persona:"tutor"
        };
    },
    changeRadioButton: function(event, string){
        this.setState({persona:string});
    },
    submitForm: function(){
        // TODO AJAX
        var username = document.getElementById("user_input").value;
        var password = document.getElementById("password_input").value;
        if(username == null || username == "") {
            this.props.displaySnackMessage("Please fill in your username");
            return null;
        }
        if(password == null || password == "") {
            this.props.displaySnackMessage("Please fill in your password");
            return null;
        }
        if(this.state.persona == "tutor") {
            var is_tutor = 0;
        } else {
            var is_tutor = 1;
        }
        // TODO hide submit button and show spinner
        document.getElementById("loginSignUpSubmitButton").style.display = 'none';
        document.getElementById("loginSignUpSubmitSpinner").style.display = 'block';
        var t = this;
        this.props.sendInfo(
            "POST",
            "/tuition/login/",
            {"username":username, "password":password, "is_tutor":is_tutor}
            ,
            function(){
                if (t.state.persona == "tutor") {
                    var flag = "tutor_main";
                } else if (t.state.persona == "student") {
                    var flag = "student_main";
                }
                t.props.displaySnackMessage("Login / Signup was successful");
                t.props.changePage(flag);
            },
            function(){
                t.props.displaySnackMessage("Login / Signup was not successful ");
            }
        );

    },
    render: function(){

    const style = {
        display: 'flex',
        flexDirection: 'row wrap',
        padding: 20,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    };

    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
    };

        return (<div style={style}>
                <div>
                    <h4>SignUp/Login</h4>
                    <TextField
                        id="user_input"
                        hintText="Enter your username"
                        floatingLabelText="Username"/><br/>
                    <TextField
                        id="password_input"
                        type="password"
                        hintText="Enter your password"
                        floatingLabelText="Password"/><br/><br/>
                    <RadioButtonGroup
                        name="tutorStudent"
                        defaultSelected="tutor"
                        onChange={this.changeRadioButton}>
                      <RadioButton
                        label="I am a tutor"
                        value="tutor"
                        style={styles.radioButton}
                      />
                      <RadioButton
                        label="I am a student"
                        value="student"
                        style={styles.radioButton}
                      />
                    </RadioButtonGroup>
                    <CircularProgress
                        id="loginSignUpSubmitSpinner"
                        ref={function(input){
                            if(input != null) {
                                document.getElementById("loginSignUpSubmitSpinner").style.display="none";
                            }
                        }}/>
                    <RaisedButton
                        id="loginSignUpSubmitButton"
                        label="Submit"
                        onClick={this.submitForm}/>
                </div>
        </div>);
    }
});

export default LoginPage;