import MyList from './list';
import React, { Component } from 'react';
import {loggedIn} from './actions.js';
import * as firebase from "firebase";
import {BrowserRouter, Route, Link, Switch, Redirect}
  from 'react-router-dom';
import { auth } from './database';
import {loggedOut, removeUser} from './actions';
import { connect } from 'react-redux';
import database, {user} from './database';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { Provider } from 'react-redux';
import store from './store.js';
import uid from 'uid'


class Nav extends Component {
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

log_out(){
  firebase.auth().signOut().then(() => {
    console.log("log out sucessfull");
    this.props.logout();
  }).catch(function(error) {
    console.log("log out failed", error);
  });
}



  auth_button () {
    if (this.props.user.uid) {
      return(
        <List>
        <Link to={'/'}>
          <ListItem
            primaryText="Logout"
            onClick={() => this.log_out()}
          />
          </Link>
        </List>
      )
    }

    return(
    <List>
      <Link to={'/add'}>
      <ListItem
        primaryText="Login"
        onClick={() => this.login()}
      />
      </Link>
    </List>
   )
  }





  render() {
    return (
      <ul>
        <li>{this.auth_button()}</li>
      </ul>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClick: function (data) {
      dispatch(loggedIn(data));
    },
    logout: function () {
      dispatch(loggedOut());
      dispatch(removeUser());
    }
  }
}
var NavConnected = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default NavConnected;
