import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'material-ui/Avatar';
import {ListItem, List} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import GenericList from './list_components';

var TutorList = React.createClass({
    getInitialState: function(){
        return {
            tutor_list:[]
        };
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
    fetchTutorList: function(){
        this.sendInfo(
            "GET",
            "/tuition/get_tutors/",
            {},
            function(xhttp){
                console.log("fetch tutor list i");
            },
            function(xhttp){

            }
        );
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
    var t = this;
        return (
            <div >
            <div style={style}>
            <TextField
              id="tutor_number_input"
              type="number"
              hintText="Enter Tutor Id"
              floatingLabelText="Tutor Id"
            />
    <FloatingActionButton
        mini={true}
        style={buttonStyle}
        onClick={function(){
          var tutor_id = document.getElementById("tutor_number_input").value;
          console.log("tutor id "+tutor_id);
          t.props.sendInfo(
              "POST",
              "/tuition/add_tutor/",
              {"tutor_id":tutor_id},
              function(xhttp){
                  t.props.displaySnackMessage("You have successfully added tutor id : " + tutor_id);
              },
              function(xhttp){
                console.log(xhttp.responseText);
                  if (xhttp.responseText == "KEY_NO_SUCH_TUTOR") {
                      t.props.displaySnackMessage("There is no tutor with id : "+tutor_id);
                  } else if (xhttp.responseText == "KEY_NO_SUCH_STUDENT") {
                      t.props.displaySnackMessage("Please refresh and login again");
                  } else if (xhttp.responseText == "KEY_BAD_RESPONSE") {
                      t.props.displaySnackMessage("You have send a bad response. Please try again");
                  }
             }
          );
        }}
        >
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
                this.getTutorListFromJson(this.state.tutor_list)
                }/>
                </div>
            </div>
        );
    }
});

export default TutorList;