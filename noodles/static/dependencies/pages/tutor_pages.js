import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import ListItem from 'material-ui/List';
import GenericList from './list_components';

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
            {source:"", name:"Brendan Lim", totalScore:"10"}
            ]
            )
            }/>
    </Tab>
  </Tabs>
  </div>
        );
    }
});

export default TutorMainPage;