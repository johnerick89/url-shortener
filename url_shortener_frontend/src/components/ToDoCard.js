import React from 'react'


class ToDoCard extends React.Component {


  state = {
    input: ''
  }


  handleListInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleListSubmit = (event) => {
    event.preventDefault()
    this.props.addList(this.props.card.id, this.state.input)
    this.setState({
      input: ''
    })
  }
  

  render(){
    return (
     

      <div className="to-do-card">
       
        <p><b>Original URL: </b>{this.props.card.original}</p>
        <p><b>Shortened URL:</b>{this.props.card.tiny}</p>
        <form onSubmit={this.handleListSubmit}>
          <input onChange={this.handleListInput} type="text" value ={this.state.input} />
        </form>
      </div>
    )
  }
}


export default ToDoCard
