import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

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
        // TODO hide submit button and show spinner
        if (this.state.persona == "tutor") {
            var flag = "tutor_main";
        } else if (this.state.persona == "student") {
            var flag = "student_main";
        }
        console.log("onsubmit triggered :" +flag);
        this.props.changePage(flag);
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
                        hintText="Enter your username"
                        floatingLabelText="Username"/><br/>
                    <TextField
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
                    <RaisedButton
                        label="Submit"
                        onClick={this.submitForm}/>
                </div>
        </div>);
    }
});

export default LoginPage;