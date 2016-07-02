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
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {getMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

var $ = require('jquery');

var AlloyEditor = require('alloyeditor');

var GenericList = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    render: function(){
    console.log("length of menu_items : " + this.props.menu_items.length);
    console.log("default message : " + this.props.default_empty_message);
    console.log("menu_items : "+ this.props.menu_items);
        if (this.props.menu_items.length > 0){
            return (
                <List>
                    {this.props.menu_items.map(function(item){return item;})}
                </List>
            );
        } else {
            return (<h4>{this.props.default_empty_message}</h4>);
        }

    }
});


var TutorList = React.createClass({
    getInitialState: function(){
        return {};
    },
    getTutorListFromJson: function(jsonList){
        return (jsonList.map(function(jsonOb){
            return (
                <ListItem
                    leftAvatar={<Avatar src={jsonOb.source}/>}
                    primaryText={jsonOb.name}/>
            );
        }));
    },
    render: function(){
    const style = {
        display: 'flex',
        flexDirection: 'row wrap',
        padding: 5,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    };
    const buttonStyle = {
        marginRight: 20,
    };
        return (
            <div >
            <div style={style}>
            <TextField
              hintText="Enter Tutor Id"
              floatingLabelText="Tutor Id"
            />
    <FloatingActionButton mini={true} style={buttonStyle}>
      <ContentAdd />
    </FloatingActionButton>
            <br />
            </div>
            <div style={style}>
            <h4>My Tutors</h4><br/>
            </div>
            <div style={style}>
            <GenericList
                menu_items={
                this.getTutorListFromJson([
                {source:"", name:"Maurice Chng"}
                ])
                }/>
                </div>
            </div>
        );
    }
});

var NewAssignmentPage = React.createClass({
    getInitialState: function(){
        return {
            questions:[]
        };
    },
    changeNumberOfQuestions: function(){
        var numberOfQuestions = document.getElementById("numberOfQuestionsInAssignment").value;
        const style = {
            display: 'flex',
            padding: 3,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        };
        var q = [];
        for (var i = 0; i < numberOfQuestions; i++) {
        var id_name = "editableContent"+i;
          q.push(
          <Paper style={style}
                zDepth={2}
                children={
                    <div>
                        <h4>Question {i}</h4>
                        <div id={id_name} ref={
                            function(input){
                                if (input != null) { // This happens when object gets dereferenced
                                    AlloyEditor.editable(input.id, {
                                        container: 'editable'
                                    });
                                }
                            }
                        }>
                            <h4>Click to edit this question</h4>
                        </div>
                        <TextField
                            hintText="Maximum grade"
                            floatingLabelText="Maximum points for this question"/>
                    </div>
                }/>
                );
        }
        this.setState({questions:q});
    },
    render: function(){
        const style = {
            display: 'flex',
            padding: 3,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        };
        return (
                <Paper style={style}
                zDepth={1}
                children={<div>
                    <div style={style}>
                        <TextField
                          hintText="Enter Assignment Name"
                          floatingLabelText="Click to set assignment name"
                          floatingLabelFixed={true} />
                        <DatePicker
                            floatingLabelText="Assignment Due Date"
                            hintText="Click to set assignment due date"
                            mode="landscape" />
                        <TextField
                          id="numberOfQuestionsInAssignment"
                          type="number"
                          hintText="Enter Number of questions"
                          floatingLabelText="Click to set number of questions"
                          onChange={this.changeNumberOfQuestions}
                          floatingLabelFixed={true} />
                    </div>
                    <div>
                    {this.state.questions}
                    </div>
                    <div><RaisedButton label="Save" style={buttonStyle} /></div>
                </div>}/>
        );
    }
});

var AssignmentsList = React.createClass({
    getInitialState: function(){
        return {};
    },
    getAssignmentListFromJson:function(jsonList){
        return (jsonList.map(function(jsonOb){
            return (
                <ListItem
                    leftAvatar={<Avatar src={jsonOb.source}/>}
                    primaryText={jsonOb.studentName}
                    secondaryText={
                        <p>
                            <span>{jsonOb.assignmentName}</span>
                        </p>
                    }
                    secondaryTextLines={2}/>
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
        <div style={styles.centerList}><h4>Ungraded Assignments</h4></div>
        <div style={styles.centerList}>
                <TextField
                  hintText="Filter"
                /><br />
        </div>
        <div style={styles.centerList}>
        <GenericList
            menu_items={
            this.getAssignmentListFromJson([
                {source:"", studentName:"Poh Puay Kai", assignmentName:"Algebra"}
            ])}/>
        </div>
        </div>);
    }
});


var Assignment = React.createClass({
    getInitialState: function(){
        return {
            questions:this.props.questions,
            currentPageNum:0,
            currentPage:null
        };
    },
    componentWillMount: function(){
        if (this.props.questions.length > 0) {
            this.setState({
                currentPage:this.getObjectFromJson(
                    this.state.questions[0]
                )
                });
        }
    },
    getObjectFromJson: function(json){
        const style = {
            display: 'flex',
            padding: 3,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        };
        const buttonStyle = {
            margin: 12,
        };
        if(json.isAnswered && json.isGraded){ //for review only
            var firstPart = (<div>
                <h4>Answer:</h4>
                <div>>{json.answer}</div></div>);
            var secondPart = (
                <div>
                <h4>Comment:</h4>
                    <div>
                        <p>{json.score} of {json.maxScore}</p>
                    </div>
                    <div>
                        <p>{json.comment}</p>
                    </div>
                </div>
            );
        } else if(json.isAnswered) { //isAnswered but not graded
            var firstPart=(

            <div><h4>Answer:</h4>
            <div>{json.answer}</div></div>);
            var hintText = "Enter a grade out of " + json.maxScore;
            var content_id = "editableContent-"+this.state.currentPageNum;
            var secondPart=(
                <div>
                <h4>Comment:</h4>
                    <div>
                        <TextField
                            hintText={hintText}
                            floatingLabelText="Enter score"
                            floatingLabelFixed={true}
                        />
                    </div>
                    <div>

                        <div id={content_id} ref={
                            function(input){
                                if(input != null) {
                                    AlloyEditor.editable(input.id, {
                                        container: 'editable'
                                    });
                                }
                            }
                        }>
                            <p>Click here to enter comment</p>
                        </div>
                    </div>
                </div>
            );
        } else { // is not answered, since once graded is considered answered

            var content_id = "editableContent-"+this.state.currentPageNum;
            var firstPart=(
            <div>
                <h4>Answer:</h4>
                <div id={content_id} ref={
                function(input){
                    if(input != null) { // This happens when objects gets dereferenced
                        AlloyEditor.editable(input.id, {
                            container: 'editable'
                        });
                    }
                }
            }>
            </div>
            </div>);
            var secondPart=(<div></div>);
        }
        return (
        <Paper
            style={style}
            zDepth={1}
            children={
            <div>
            <div>{json.question}</div>
            <Divider/>
            {firstPart}
            <Divider/>
            {secondPart}
            <RaisedButton
                label="Next"
                style={buttonStyle}
                onTouchEnd={this.goToNextPage}
                onClick={this.goToNextPage}/>
            </div>
        }/>

        );
    },
    goToNextPage: function(){
        console.log("triggered go to next page");
        var nextPageNumber = (this.state.currentPageNum + 1) % this.state.questions.length;
        var nextQuestion = this.getObjectFromJson(this.state.questions[nextPageNumber]);
        this.setState({
            currentPageNum:nextPageNumber,
            currentPage:nextQuestion
        });
    },
    render: function(){
        return (<div>{this.state.currentPage}</div>);
    }
});


var StudentMainPage = React.createClass({
    getInitialState: function(){
        return {};
    },
    getCompletedAssignmentsFromJson: function(jsonList){
        return (jsonList.map(function(jsonOb){
            return (
                <ListItem
                    primaryText={jsonOb.name}
                    secondaryText={
                        <p>
                            <span>Due Date</span> :
                            {jsonOb.marks}
                        </p>
                    }/>
            );
        }));
    },
    getDueAssignmentsFromJson: function(jsonList){
        return (jsonList.map(function(jsonOb){
            return (
                <ListItem
                    primaryText={jsonOb.name}
                    secondaryText={
                        <p>
                            <span>Due Date</span> :
                            {jsonOb.dueDate}
                        </p>
                    }/>
            );
        }));
    },
    render: function(){

        const styles = {
          headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
          },
          centerItem: {
            display: 'flex',
            flexDirection: 'row wrap',
            padding: 20,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          },
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
        <div style={styles.centerList}>
  <Tabs>
    <Tab label="Due Assignments" >
        <GenericList
            default_empty_message={"You do not have any due assignments."}
            menu_items={[]}/>
    </Tab>
    <Tab label="Completed Assignments" >
        <GenericList
            default_empty_message={"You do not have any completed assignments"}
            menu_items={[]}/>
    </Tab>
  </Tabs>
  </div>
        );
    }
});



var TutorMainPage = React.createClass({
    getInitialState: function(){
        return {};
    },
    getStudentListFromJson: function(jsonList){
        return (jsonList.map(function(jsonOb){
            return (
                <ListItem
                  leftAvatar={<Avatar src={jsonOb.source}/>}
                  primaryText={jsonOb.name}
                  secondaryText={
                    <p>
                      <span>Total score</span> :
                      {jsonOb.totalScore}
                    </p>
                  }
                  secondaryTextLines={2}
                />
            );
        }));
    },
    getAssignmentListFromJson: function(jsonList){
        return (jsonList.map(function(jsonOb){
            return (
                <ListItem
                    primaryText={jsonOb.name}
                    secondaryText={
                        <p>
                            <span>Total completed</span> :
                            {jsonOb.totalCompleted}
                        </p>
                    }
                  secondaryTextLines={2}
                    />
            );
        }));
    },
    render: function(){

        const styles = {
          headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
          },
          centerItem: {
            display: 'flex',
            flexDirection: 'row wrap',
            padding: 20,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          },
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
        <div style={styles.centerList}>
        <Tabs>
    <Tab label="Assignments" >
           <GenericList
                default_empty_message={"You have not created any assignments yet."}
                menu_items={
                this.getAssignmentListFromJson(
                [
                {name:"Simultaneous Equation 1", dueDate:"", totalCompleted:"0"}
                ]
                )
                }
                />
    </Tab>
    <Tab label="Students" >
        <GenericList
            default_empty_message={"You do have any students yet."}
            menu_items={
            this.getStudentListFromJson(
            [
//            {source:"", name:"Brendan Lim", totalScore:"10"}
            ]
            )
            }/>
    </Tab>
  </Tabs>
  </div>
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
                    <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                      <RadioButton
                        value="light"
                        label="I am a tutor"
                        style={styles.radioButton}
                      />
                      <RadioButton
                        value="not_light"
                        label="I am a student"
                        style={styles.radioButton}
                      />
                    </RadioButtonGroup>
                    <FlatButton
                        label="Submit"/>
                </div>
        </div>);
    }
});

var App = React.createClass({
    componentDidMount: function(){},
    getInitialState: function(){
        return {
            current_page:<Assignment questions={[
                {isAnswer:true, isGraded:true, answer:"Example answer 1", score:9, maxScore:10, comment:"Example comment 1"},
                {isAnswer:true, isGraded:false, answer:"Example answer 2", score:8, maxScore:9, comment:"Example comment 2"},
                {isAnswer:false, isGraded:false, answer:"Example answer 3", score:7, maxScore:8, comment:"Example comment 3"}
            ]}/>,
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