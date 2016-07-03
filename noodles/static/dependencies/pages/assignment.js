import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

var $ = require('jquery');

var AlloyEditor = require('alloyeditor');

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

export default Assignment;