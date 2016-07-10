import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {ListItem, List} from 'material-ui/List';
import GenericList from './list_components';

var TutorMainPage = React.createClass({
    componentWillMount: function(){
        var t = this.props;
        var th = this;
        var studentLista = [];
        var assignmentLista = [];
        this.props.sendInfo(
            "GET",
            "/tuition/get_ungraded_assignment/",
            {},
            function(xhttp){
                console.log("before parsing assignment : " + xhttp.responseText);
                assignmentLista = JSON.parse(xhttp.responseText);
                console.log("parsed assignment list : " + assignmentLista);
                t.sendInfo(
                    "GET",
                    "/tuition/get_students/",
                    {},
                    function(xhttpa){
                        console.log("before parsing student : " + xhttp.responseText);
                        studentLista = JSON.parse(xhttpa.responseText);
                        console.log("parsed student list : " + studentLista);

                        th.setState({
                            studentList:studentLista,
                            assignmentList:assignmentLista
                        });
                    },
                    function(xhttpa){
                        t.displaySnackMessage("There was some problem retrieving your students. Please login and try again.")
                    }
                );
            },
            function(xhttp){
                t.displaySnackMessage("There was some problem retrieving your assignments. Please login and try again.");
            }
        );
    },
    getInitialState: function(){
        return {
            studentList:[],
            assignmentList:[]
        };
    },
    getStudentListFromJson: function(jsonList){
        const styles = {
          centerItem: {
            display: 'flex',
            flexDirection: 'row wrap',
            padding: 5,
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          }
        };
        return (jsonList.map(function(jsonOb){
        console.log(jsonOb);
            return (
                <ListItem
                  style={styles.centerItem}
                  leftAvatar={<Avatar src={jsonOb.source}/>}
                  primaryText={jsonOb.name}
                  secondaryText={
                    <p>
                      <span>Total score</span> :
                      {jsonOb.total_score}
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
                            <span>Due Date</span> :
                            {jsonOb.due_date}
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
            width:"60%"
          },
          centerList: {
            width:"60%",
            alignItems:'center',
            justifyContent:'center'
          }
        };
        console.log("assignmentList : " + this.state.assignmentList);
        console.log("studentList : " + this.state.studentList);
        return (
        <div>
        <Tabs>
    <Tab label="Assignments" >
           <GenericList
                default_empty_message={"You have not created any assignments yet."}
                menu_items={
                this.getAssignmentListFromJson(
//                [
//                {name:"Simultaneous Equation 1", dueDate:"", totalCompleted:"0"}
//                ]
                this.state.assignmentList
                )
                }
                />
    </Tab>
    <Tab label="Students" >
        <GenericList
            default_empty_message={"You do have any students yet."}
            menu_items={
            this.getStudentListFromJson(
//            [
//            {source:"", name:"Brendan Lim", totalScore:"10"}
//            ]
            this.state.studentList
            )
            }/>
    </Tab>
  </Tabs>
  </div>
        );
    }
});

export default TutorMainPage;