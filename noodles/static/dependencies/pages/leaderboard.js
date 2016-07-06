import React from 'react';
import ReactDOM from 'react-dom';
import GenericList from './list_components';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

var LeaderBoard = React.createClass({
    getInitialState: function(){
        return {
            currentAssignmentId:0
        };
    },
    getLeaderBoardListFromJson: function(jsonList){
        return (jsonList.map(function(jsonOb){
            return (
                <ListItem
                    leftAvatar={<Avatar src={jsonOb.source}/>}
                    primaryText={jsonOb.name}
                    secondaryText={
                        <p>
                            <span>Score</span>:
                            {jsonOb.assignmentScore}
                        </p>
                    }
                    secondaryTextLines={2}
                    />
            );
        }));
    },
    getAssignmentsFromJson: function(jsonList){
        return (jsonList.map(function(jsonOb){
            return (
                <MenuItem
                    value={jsonOb.id}
                    primaryText={jsonOb.name}/>
            );
        }));
    },
    handleAssignmentChange: function(event, index, value){
        this.setState({currentAssignmentId:value});
    },
    render: function(){
        return (<div>
            <h4>LeaderBoards</h4>
            <div>
                <SelectField
                    value={this.state.currentAssignmentId}
                    onChange={this.handleAssignmentChange}>
                        {this.getAssignmentsFromJson([
                            {id:0, name:"Linear Algebra"}
                        ])}
                    </SelectField>
            </div>
            <div>
                <GenericList
                    default_empty_message="No students have completed the assignment yet"
                    menu_items={
                        this.getLeaderBoardListFromJson([
                            {source:"", name:"Kim Mui", assignmentScore:10}
                        ])
                    }/>
            </div>
        </div>);
    }
});

export default LeaderBoard;