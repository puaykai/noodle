import React from 'react';
import ReactDOM from 'react-dom';
import {getMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {AppBar, IconButton, IconMenu, MenuItem, Divider, TextField} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItemDialog from "./dialogs/form_dialog";
import SimpleLayout from "./detailpage/simple_layout";
import GridListSimple from "./frontpage/grid_layout";
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import SocialPerson from 'material-ui/svg-icons/social/person';

var NormalAppBar = React.createClass({
    getInitialState: function(){
        return {
            loginCheck:false,
        };
    },
    setLogin: function(val){
        this.setState({loginCheck:val});
    },
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
        console.log("OK!");
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
                onTouchTap={function(){console.log("Clicking sign out");}}/>
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
  render: function() {
    return (<MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
      <NormalAppBar/>
        <GridListSimple/>
        </div>
      </MuiThemeProvider>);
  }
});

var DetailPage = React.createClass({
  render: function() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
      <NormalAppBar/>
      <SimpleLayout/>
      </div>
      </MuiThemeProvider>
      );
  }
});

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
ReactDOM.render(
  (<DetailPage/>)
  , 
	document.getElementById('content'));