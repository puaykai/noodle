import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';


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
    iconElementLeft={<IconButton></IconButton>}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {this.props.menuItems}
      </IconMenu>
    }
  />
        );
    }
});

export default Header;