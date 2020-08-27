import React from 'react'
import ToDoCard from '../components/ToDoCard'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ToDoCardContainer(props){
  const classes = useStyles();

  function renderUrls(){
    return props.cards.map(card => {
      return <ToDoCard key={card.id} handleClickList={props.handleClickList} addList={props.addList} card={card}/>
    })
  }

  return (
    
    <div>
      <List className={classes.root}>
      <ListItem>
      {renderUrls()}
      </ListItem>
      <Divider variant="inset" component="li" />
      </List>
    </div>
  )
}

export default ToDoCardContainer;
