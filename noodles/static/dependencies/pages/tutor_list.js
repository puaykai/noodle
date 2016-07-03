import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import GenericList from './list_components';

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

export default TutorList;