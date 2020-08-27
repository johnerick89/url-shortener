import React from "react";
import CreateUrl from "../components/CreateUrl";
import UrlsListContainer from "./UrlsListContainer";

export default class MainContainer extends React.Component {
  state = {
    urls: [],
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
        });
      });
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
        <CreateUrl createNewUrl={this.createNewUrl} />
        <UrlsListContainer
          urls={this.state.urls}
        />
      </div>
    );
  }
}
