import goalpng from './goal.png'
import React, { Component } from 'react';
import Img from 'react-image'
import {BrowserRouter, Route, Link, Switch, Redirect}
  from 'react-router-dom';
import { auth } from './database';
import './App.css';

class Pic extends Component {
  constructor(props) {
    super(props);
  }

  login () {
    auth()
      .then((user) => {
        console.log(user);
        //this.setState({logged_in: true});
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  render() {
    return (
    <div className = "frontPage">
      <div className = "login">
        <h5> Click on image to Login </h5>
      </div>
      <Link to={'/list'}>
        <Img className = "start" src={goalpng} onClick={() => this.login()}/>
      </Link>
    </div>
    );
  }
}
export default Pic;
