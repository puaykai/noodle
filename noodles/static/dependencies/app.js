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
	render: function() {
		return  (  <AppBar
    title={"Whats for dinner today?"}
    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    iconElementRight={
    <div>
      <MenuItemDialog primaryText="" dialogContent={
        <div>
        <TextField id="username" hintText="Enter your username" floatingLabelText="Username"/><br/>
        <TextField type="password" id="password" hintText="Enter your password" floatingLabelText="Password"/>
        </div>
      } leftIcon={<SocialPerson/>} dialogTitle="Login/SignUp"/>
    </div>
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
  (<FrontPage/>)
  , 
	document.getElementById('content'));