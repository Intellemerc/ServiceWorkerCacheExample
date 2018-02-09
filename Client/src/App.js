import React, { Component } from "react";
import Nav from "./nav";
import Content from "./content";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: "100%" }}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Nav />
        <Content />
      </div>
    );
  }
}

export default App;
