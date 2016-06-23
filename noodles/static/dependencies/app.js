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
    title="Whats For Dinner Today?"
    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
      <MenuItemDialog primaryText="Sign Up" dialogContent={
        <div>
        <TextField hintText="Enter your username" floatingLabelText="Username"/><br/>
        <TextField hintText="Enter your password" floatingLabelText="Password"/>
        </div>
      } leftIcon={<PersonAdd/>} dialogTitle="Sign Up"/>
      <MenuItemDialog primaryText="Login" dialogContent={
        <div>
        <TextField hintText="Enter your username" floatingLabelText="Username"/><br/>
        <TextField hintText="Enter your password" floatingLabelText="Password"/>
        </div>
      } leftIcon={<SocialPerson/>} dialogTitle="Login"/>
        <Divider />
        <MenuItem primaryText="Help" />
      </IconMenu>
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