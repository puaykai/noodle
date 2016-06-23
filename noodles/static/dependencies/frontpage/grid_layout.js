import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

var gridWidth = Math.floor(window.innerWidth * 0.8);
var gridHeight = Math.floor(window.innerHeight * 1);

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: gridWidth,
    height: gridHeight,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const tilesData = [
  {
    img:'img1',
    title: 'title1',
    author: 'author1',
    link: '/noodles/1/detail'
  },
  {
    img:'img2',
    title: 'title2',
    author: 'author2',
    link: '/noodles/1/detail'
  },
  {
    img:'img3',
    title: 'title3',
    author: 'author3',
    link: '/noodles/1/detail'
  },
  {
    img:'img4',
    title: 'title4',
    author: 'author4',
    link: '/noodles/1/detail'
  },
  {
    img:'img5',
    title: 'title5',
    author: 'author5',
    link: '/noodles/1/detail'
  },
  {
    img:'img6',
    title: 'title6',
    author: 'author6',
    link: '/noodles/1/detail'
  },
  {
    img:'img7',
    title: 'title7',
    author: 'author7',
    link: '/noodles/1/detail'
  },
  {
    img:'img8',
    title: 'title8',
    author: 'author8',
    link: '/noodles/1/detail'
  },
  {
    img:'img9',
    title: 'title9',
    author: 'author9',
    link: '/noodles/1/detail'
  },
  {
    img:'img10',
    title: 'title10',
    author: 'author10',
    link: '/noodles/1/detail'
  },
  {
    img:'img11',
    title: 'title11',
    author: 'author11',
    link: '/noodles/1/detail'
  },
  {
    img:'img12',
    title: 'title12',
    author: 'author12',
    link: '/noodles/1/detail'
  },
   
]

var GridListSimple = React.createClass({
  render: function(){
    var cellHeight = 200;
    var cellWidth = 200;
    var padding = 10;

    var grid = tilesData.map(function(tile) {
        return (<a href={tile.link}><GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}        >
        </GridTile></a>);
    });
    return (
  <div style={styles.root}>
    <GridList
      cellHeight={cellHeight}
      style={styles.gridList}
      padding={padding}
      cols={Math.floor(window.innerWidth / (cellWidth + padding))}
    >
      {grid}
    </GridList>
  </div>);
}
  });


export default GridListSimple;