import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {getMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {Dialog, FlatButton, RaisedButton, MenuItem} from 'material-ui';
import SocialPerson from 'material-ui/svg-icons/social/person';

var RaisedDialogButton = React.createClass({
  getInitialState: function(){return {open:false};},
  handleClose:function(){this.setState({open:false});},
  handleOpen:function(){this.setState({open:true});},
  render: function(){
    const action = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}/>,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}/>,
    ];

    return (<div><RaisedButton label="Dialog" onTouchTap={this.handleOpen}/>
              <Dialog
          title="Dialog With Actions"
          actions={action}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.dialogContent}
        </Dialog></div>);
  }
});

//actually Login/SignUp button but cannot change name of variable
var MenuItemDialog = React.createClass({
  getInitialState: function(){
    return {
        open:false,
        openSnackBar:false,
        message:""};
  },
  handleClose:function(){this.setState({open:false});},
  handleOpen:function(){this.setState({open:true});},
  handleSnackOpen:function(){this.setState({openSnackBar:true});},
  handleSnackClose:function(){this.setState({openSnackBar:false})},
  handleSubmit: function(){
    var token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var xhttp = new XMLHttpRequest();
    var t = this;
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("response : " + xhttp.responseText);
            var message = "";
            var login = false;
            if (xhttp.responseText == "KEY_LOGIN_SUCCESS") {
                login=true;
                message = "Login was successful";
            } else if (xhttp.responseText == "KEY_USER_ACCOUNT_DISABLED") {
                message = "Your account has been disabled";
            } else if (xhttp.responseText == "KEY_INVALID_LOGIN") {
                message = "Login was invalid. Please try again later.";
            } else if (xhttp.responseText == "KEY_CREATE_USER_FAILED") {
                message = "Failed to create new user. Please try again.";
            } else if (xhttp.responseText == "KEY_CREATE_USER_SUCCESS") {
                login = true;
                message = "Sign Up was succcessful.";
            }
        }
        t.setState({open:false});
        t.setState({message:message});
        t.handleSnackOpen();
        t.props.changeLoginState(login);
    };
    xhttp.open("POST", "/account/login/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("csrfmiddlewaretoken="+token+"&username="+username+"&password="+password);
    document.getElementById("login_cancel_button").style.visibility = "hidden";
    document.getElementById("login_submit_button").style.visibility = "hidden";
  },
  render: function(){
    const actions = [
      <FlatButton
        id="login_cancel_button"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}/>,
      <FlatButton
        id="login_submit_button"
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit}/>,
    ];

    return (<div><MenuItem primaryText={this.props.primaryText} onTouchTap={this.handleOpen} leftIcon={this.props.leftIcon}/>
              <Dialog
          title={this.props.dialogTitle}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.dialogContent}
        </Dialog>
        <Snackbar
            open={this.state.openSnackBar}
            message={this.state.message}
            autoHideDuration={3000}
            onRequestClose={this.handleSnackClose}
        />
        </div>);
  }
});


export default RaisedDialogButton;
export default MenuItemDialog;