import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from 'material-ui/Snackbar';
import {getMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {AppBar, IconButton, IconMenu, MenuItem, Divider, TextField} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItemDialog from "./dialogs/form_dialog";
import SimpleLayout from "./detailpage/simple_layout";
import ArticleLayout from "./detailpage/simple_layout";
import GridListSimple from "./frontpage/grid_layout";
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import SocialPerson from 'material-ui/svg-icons/social/person';

function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
  }

var NormalAppBar = React.createClass({
    getInitialState: function(){
        return {
            loginCheck:false,
        };
    },
    setLogin: function(val){
        this.setState({loginCheck:val});
    },
    handleSnackClose: function(){
        this.props.closeSnackBar();
    },
    handleSnackOpen: function(){this.props.openSnackBar()},
    changeSnackMessage: function(message){this.props.changeSnackMessage(message)},
	render: function() {
	    console.log("get state :" + this.state.loginCheck);
	    var mount_component = (    <div>
      <MenuItemDialog changeLoginState={this.setLogin} primaryText="" dialogContent={
        <div>
        <TextField id="username" hintText="Enter your username" floatingLabelText="Username"/><br/>
        <TextField type="password" id="password" hintText="Enter your password" floatingLabelText="Password"/>
        </div>
      } leftIcon={<SocialPerson/>} dialogTitle="Login/SignUp"/>
    </div>);
        if (this.state.loginCheck){
        var t = this;
        var signout = function(){
                    var token = getCookie('csrftoken');
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if (xhttp.readyState == 4 && xhttp.status == 200) {
                            var message = "";
                            var login = true;
                            if (xhttp.responseText == "KEY_LOGOUT_SUCCESSFUL"){
                                login = false;
                                message = "Logout was successful";
                            } else if (xhttp.responseText == "KEY_LOGOUT_FAILED"){
                                message = "Logout was not successful";
                            }
                            t.setLogin(login);
                            t.changeSnackMessage(message);
                            t.handleSnackOpen();
                            console.log("open snack bar");
                        }
                    };
                    xhttp.open("POST", "/account/logout/", true);
                    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhttp.send("csrfmiddlewaretoken="+token);
        };
            mount_component = (
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="My Account"
                onTouchTap={function(){console.log("Clicking my account")}}/>
      <MenuItem primaryText="My Articles"
                onTouchTap={function(){console.log("Clicking my articles");}}/>
      <MenuItem primaryText="Sign out"
                onTouchTap={signout}/>
    </IconMenu>
            );
        }
		return  (  <AppBar
    title={"Whats for dinner today?"}
    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    iconElementRight={
mount_component
    }/>);
}
});

var FrontPage  = React.createClass({
  getInitialState: function(){
    return {
        openSnackBar:false,
        message:""
    };
  },
  handleSnackOpen:function(){this.setState({openSnackBar:true})},
  handleSnackClose:function(){this.setState({openSnackBar:false})},
  changeSnackMessage:function(message){this.setState({message:message})},
  render: function() {
    return (<MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
      <NormalAppBar openSnackBar={this.handleSnackOpen} closeSnackBar={this.handleSnackClose} changeSnackMessage={this.changeSnackMessage}/>
        <GridListSimple/>
                <Snackbar
                    open={this.state.openSnackBar}
                    message={this.state.message}
                    autoHideDuration={3000}
                    onRequestClose={this.handleSnackClose}/>
        </div>
      </MuiThemeProvider>);
  }
});

var DetailPage = React.createClass({
  getInitialState: function(){
    return {
        openSnackBar:false,
        message:""
    };
  },
  handleSnackOpen:function(){this.setState({openSnackBar:true})},
  handleSnackClose:function(){this.setState({openSnackBar:false})},
  changeSnackMessage:function(message){this.setState({message:message})},
  render: function() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
      <NormalAppBar openSnackBar={this.handleSnackOpen} closeSnackBar={this.handleSnackClose} changeSnackMessage={this.changeSnackMessage}/>
      <SimpleLayout/>
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

var WriteArticlePage = React.createClass({
  getInitialState: function(){
    return {
        openSnackBar:false,
        message:""
    };
  },
  handleSnackOpen:function(){this.setState({openSnackBar:true})},
  handleSnackClose:function(){this.setState({openSnackBar:false})},
  changeSnackMessage:function(message){this.setState({message:message})},
    render: function(){
        console.log("write article page ....");
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <NormalAppBar openSnackBar={this.handleSnackOpen} closeSnackBar={this.handleSnackClose} changeSnackMessage={this.changeSnackMessage}/>
                    <ArticleLayout/>
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
  (<WriteArticlePage/>)
  , 
	document.getElementById('content'));