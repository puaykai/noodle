import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import ListItem from 'material-ui/List';
import GenericList from './list_components';

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

export default StudentMainPage;