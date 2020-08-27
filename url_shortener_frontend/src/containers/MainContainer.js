import React from 'react'
import CreateCard from '../components/CreateCard'
import ToDoCardContainer from './ToDoCardContainer'


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';


export default class MainContainer extends React.Component {

  state = {
    cards: []
  }

  componentDidMount(){
    fetch("http://localhost:8000/api/urls/")
    .then(resp => resp.json())
    .then(cards => {
      this.setState({
        cards: cards
      })
    })
  }

  createNewCard = (input) => {
    fetch("http://localhost:8000/api/urls/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        original: input
      })
    })
    .then(resp => resp.json())
    .then(newCard => {
      this.setState({
        cards: [...this.state.cards, newCard]
      })
    })
  }

  addList = (cardId, input) => {
    fetch("http://localhost:3000/lists", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        original: input
      })
    })
    .then(resp => resp.json())
    .then(newList => {
      const foundCard = {...this.state.cards.find(card => card.id === cardId)}
      foundCard.lists = [...foundCard.lists, newList]

      const newCards = this.state.cards.map(card => {
        if (card.id === cardId){
          return foundCard
        } else {
          return card
        }
      })

      this.setState({
        cards: newCards
      })

    })
  }

  handleClickList = (cardId, listId) => {

    const foundCard = {...this.state.cards.find(card => card.id === cardId)}
    const foundList = foundCard.lists.find(list => list.id === listId)

    let newState = null

    if (foundList.completed) {
      newState = false
    } else {
      newState = true
    }

    fetch(`http://localhost:3000/lists/${listId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        completed: newState
      })
    })
    .then(resp => resp.json())
    .then(newList => {

      const newLists = foundCard.lists.map(list => {
        if (list.id === listId){
          return newList
        } else {
          return list
        }
      })
      foundCard.lists = newLists


      const newCards = this.state.cards.map(card => {
        if (card.id === cardId) {
          return foundCard
        } else {
          return card
        }
      })

      this.setState({
        cards: newCards
      })
    })
  }


  render(){
    return (
      <div className="main-container">
        <List >
          <ListItem alignItems={"center"}> 
          <CreateCard createNewCard={this.createNewCard}/>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
          <ToDoCardContainer cards={this.state.cards} addList={this.addList} handleClickList={this.handleClickList}/>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </div>
    )
  }

}
