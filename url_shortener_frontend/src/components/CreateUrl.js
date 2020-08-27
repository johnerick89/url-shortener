import React from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

class CreateCard extends React.Component {
  state = {
    input: "",
  };

  handleInput = (event) => {
    event.persist();
    this.setState({
      input: event.target.value,
    });
  };

  handleNewUrl = (event) => {
    event.preventDefault();
    this.setState({
      input: "",
    });
    this.props.createNewUrl(this.state.input);
  };

  render() {
    return (
      <Card
        style={{ minWidth: "800px", marginBottom: "20px" }}
        variant="outlined"
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            Enter URL to shorten
          </Typography>
          <form
            onSubmit={this.handleNewUrl}
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <TextField
              id="enter-url-input"
              label="Original URL"
              value={this.state.input}
              style={{ marginBottom: "20px" }}
              onChange={this.handleInput}
            />
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
            >
              Shorten &amp; Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default CreateCard;
