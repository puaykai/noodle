import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {getMuiTheme, MuiThemeProvider} from 'material-ui/styles';


var GenericList = React.createClass({
    getInitialState: function(){
        return {
            generic_empty_message:""
        };
    },
    render: function(){
        if (this.props.menu_items.size() > 0){
            var items = this.props.menu_items;
        } else {
            var items = (this.state.generic_empty_message);
        }
        return (
            <List>
                {this.props.menu_items.map(function(item){return item;})}
            </List>
        );
    }
});


var TutorList = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function(){
        return (
            <div>
            <TextField
              hintText="Enter Tutor Id"
              floatingLabelText="Tutor Id"
            /><br />
            <GenericList
                menu_items={
                [<ListItem
                    primaryText="Lim Tian Heng"
                    leftAvatar={<Avatar/>}
                    />,
                <ListItem/>,
                <ListItem/>]
                }/>
            </div>
        );
    }
});


var Assignment = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function(){
        return (<div>assignment</div>);
    }
});

var AssignmentsList = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function(){
        return (<div>
        <GenericList
            menu_items={[]}/>
        </div>);
    }
});


var NewAssignmentPage = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function(){
        return (<div>
        <DatePicker hintText="Click to select assignment due date"/><br/>
        <TextField
              hintText="Enter the name of the assignment"
              floatingLabelText="Assignment Name"
            /><br/>
        <TextField
              hintText="Enter the number of questions in this assignment"
              floatingLabelText="Number of questions in assignment"
            /><br/>
        <GenericList
              menu_items={[]}/>
        </div>);
    }
});


var StudentMainPage = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function(){

        const styles = {
          headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
          },
        };

        return (
  <Tabs>
    <Tab label="Due Assignments" >
        <GenericList
            menu_items={[]}/>
    </Tab>
    <Tab label="Completed Assignments" >
        <GenericList
            menu_items={[]}/>
    </Tab>
  </Tabs>
        );
    }
});



var TutorMainPage = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function(){

        const styles = {
          headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
          },
        };

        return (  <Tabs>
    <Tab label="Assignments" >
      <div>
        <h2 style={styles.headline}>Assignments</h2>
        <p>
          This is an example tab.
        </p>
        <p>
          You can put any sort of HTML or react component in here. It even keeps the component state!
        </p>
        <Slider name="slider0" defaultValue={0.5} />
      </div>
    </Tab>
    <Tab label="Students" >
        <GenericList
            menu_items={[]}/>
    </Tab>
  </Tabs>
        );
    }
});

var Header = React.createClass({
    getInitialState: function(){
        return {
            header_title:""
        };
    },
    render: function(){
        return (
  <AppBar
    title={this.state.header_title}
    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    }
  />
        );
    }
});

var Footer = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function(){
        return (
<footer id="main-footer">
	<div class="container">
		<div id="logos">
			<a rel="nofollow" target="_blank" href="https://www.mcafeesecure.com/RatingVerify?ref=www.elegantthemes.com"></a>
			<a rel="nofollow" target="_blank" href="https://safeweb.norton.com/report/show?url=www.elegantthemes.com"></a>
			<a rel="nofollow" target="_blank" href="http://www.bbb.org/greater-san-francisco/business-reviews/web-design/elegant-themes-in-san-francisco-ca-376238"></a>
		</div>
		<div id="copyright">
			<a id="facebook" href="http://www.facebook.com/elegantthemes/">65,289 <span>followers</span></a>
			<a id="twitter" href="http://www.twitter.com/elegantthemes/">30,323 <span>followers</span></a>
			<a id="email" href="http://www.elegantthemes.com/newsletter.html">207,907 <span>followers</span></a>
		</div>
	</div>
	<ul id="bottom-menu">
		<li><a href="http://www.elegantthemes.com/about/">About Us</a></li>
		<li><a href="http://www.elegantthemes.com/affiliates/">Affiliates</a></li>
		<li><a href="http://www.elegantthemes.com/careers/">Careers</a></li>
		<li><a href="http://www.elegantthemes.com/privacy.html">Privacy Policy</a></li>
		<li><a href="http://www.elegantthemes.com/terms.html">Terms &amp; Conditions</a></li>
	</ul>
	<p id="company_copyright">Copyright © 2016 Elegant Themes ®</p>
</footer>
        );
    }
});


var LoginPage = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function(){

    const style = {
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block'
    };

        return (<div>
            <Paper
                style={style}
                zDepth={1}
                children={
                <div>
                    <Subheader>SignUp/Login</Subheader>
                    <TextField
                        hintText="Enter your username"
                        floatingLabelText="Username"/><br/>
                    <TextField
                        hintText="Enter your password"
                        floatingLabelText="Password"/><br/>
                    <div>
                        <input type="radio" name="tutor_or_student" value="tutor"/><br/>
                        <input type="radio" name="tutor_or_student" value="student"/><br/>
                    </div>
                    <FlatButton
                        label="Submit"/>
                </div>
                }/>
        </div>);
    }
});

var App = React.createClass({
    componentDidMount: function(){},
    getInitialState: function(){
        return {
            current_page:<LoginPage/>,
            openSnackBar:false,
            message:""
        };
    },
    handleSnackOpen:function(){this.setState({openSnackBar:true})},
    handleSnackClose:function(){this.setState({openSnackBar:false})},
    changeSnackMessage:function(message){this.setState({message:message})},
    changePage: function(page_name){
        if (page_name == "tutor_main") {
            this.setState({"current_page":<TutorMainPage/>});
        } else if (page_name == "student_main") {
            this.setState({"current_page":<StudentMainPage/>});
        } else if (page_name == "new_assignment") {
            this.setState({"current_page":<NewAssignmentPage/>});
        } else if (page_name == "assignment_list") {
            this.setState({"current_page":<AssignmentsList/>});
        } else if (page_name == "assignment") {
            this.setState({"current_page":<Assignment/>});
        }
    },
    render: function(){
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <Header/>
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