import React from "react";
import CreateUrl from "../components/CreateUrl";
import UrlsListContainer from "./UrlsListContainer";
import validator from 'validator';

export default class MainContainer extends React.Component {
  state = {
    urls: [],
    newUrl: ""
  };

  componentDidMount() {
    fetch("http://localhost:8000/api/urls/")
      .then((resp) => resp.json())
      .then((urls) => {
        this.setState({
          urls: urls,
        });
      });
  }

  createNewUrl = (input) => {
    console.log(input)
    if (validator.isURL(input)){
    fetch("http://localhost:8000/api/urls/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        original: input,
      }),
    })
      .then((resp) => resp.json())
      .then((newUrl) => {
        this.setState({
          urls: [...this.state.urls, newUrl],
          newUrl : newUrl
        });
      });
    };
  };


  render() {
    return (
      <div
        className="main-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <CreateUrl createNewUrl={this.createNewUrl} newUrl ={this.state.newUrl}/>
        <UrlsListContainer
          urls={this.state.urls}
        />
      </div>
    );
  }
}
