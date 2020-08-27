import React from "react";

import { ListItem, ListItemText, Typography } from "@material-ui/core";

class ToDoCard extends React.Component {
  state = {
    input: "",
  };

  handleListInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleListSubmit = (event) => {
    event.preventDefault();
    this.props.addList(this.props.card.id, this.state.input);
    this.setState({
      input: "",
    });
  };

  render() {
    return (
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {`Original URL: ${this.props.card.original}`}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {`Shortened URL: ${this.props.card.tiny}`}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
     
    );
  }
}

export default ToDoCard;
