import React from 'react';
import Paper from 'material-ui/Paper';

var main_paper_width = Math.floor(window.innerWidth * 0.95);
var main_paper_height = Math.floor(window.innerHeight * 2);
var sub_paper_width = Math.floor(main_paper_width * 0.4);
var sub_paper_height = Math.floor(main_paper_height * 0.4);
var sub_paper_margin = 10;
var comments_paper_width = Math.floor((sub_paper_width+ sub_paper_margin) * 2);
var comments_paper_height = Math.floor(main_paper_height * 0.55);

const style = {
  height: main_paper_height,
  width: main_paper_width,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};

const sub_style = {
  height: sub_paper_height,
  width: sub_paper_width,
  margin: sub_paper_margin,
  textAlign: 'center',
  display: 'inline-block',
};

const comments_style = {
	height: comments_paper_height,
	width: comments_paper_width,
	margin: 10,
	textAlign: 'center',
	display: 'inline-block',
};

var SimpleLayout = React.createClass({
	render: function(){
		return ( <div>
    <Paper style={style} 
    zDepth={1}
    children={<div><Paper style={sub_style} zDepth={2} />
			<Paper style={sub_style} zDepth={2} />
			<Paper style={comments_style} zDepth={2} /></div>} />
  </div>);
	}
});

export default SimpleLayout;