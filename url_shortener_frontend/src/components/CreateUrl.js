import React from "react";
import {
  TextField,
  Button,
  Card,List,
  CardContent,
  Typography,
  ListItem, 
  ListItemText , 
  Divider
} from "@material-ui/core";
import SimpleReactValidator from 'simple-react-validator';
import validator from 'validator';


class CreateCard extends React.Component {
  state = {
    input: "",
    isSaved: false
  };

  constructor() {
    super();
    this.validator = new SimpleReactValidator();
  }


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
      isSaved: true
    });
    this.props.createNewUrl(this.state.input);
    
  };

   NewUrl = ({ newUrl }) => <h1>{this.props.newUrl}</h1>;
   
  

  render() {
    let {isSaved} = this.state;
    const renderShortenedUrl = ()=>{
     
      if(isSaved){
        return (
          
          <Card
            style={{ width: "800px", minWidth: "800px", marginBottom: "20px" }}
            variant="outlined"
          >
            <Typography variant="h5" component="h2">
            Shortened URL
          </Typography>
            <List >
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {`Original URL: ${this.props.newUrl.original}`}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {`Shortened URL: ${this.props.newUrl.tiny}`}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
            </List>
          </Card>
        );
      }
    }
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
            {this.validator.message('input', this.state.input, 'required|url')}
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
            >
              Shorten &amp; Continue
            </Button>
          </form>
          {renderShortenedUrl()}
        </CardContent>
      </Card>
    );
  }
}

export default CreateCard;
