import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {clicked} from './actions';
import uid from 'uid'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
// import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import database, {User} from './database';
import './App.css';

import {Link} from 'react-router-dom';

class MyListComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.history = props.history;

  }


  showInfo(event, key) {
    let exersiseIndex = this.props.contacts.findIndex((contact)=>{
      if (contact.key === key) {return contact}
    })
    this.props.onClick(exersiseIndex);

  }

render() {
  var list = this.props.contacts.map((exersise, index) => {
    console.log('person is',exersise)
    if(exersise.clicked){
      return (<li key={exersise.key} onClick={(event)=>this.showInfo(event, exersise.key)}>
      <p> Workout: {exersise.name} Date: {exersise.date} Exersise: {exersise.exersise} Weight: {exersise.weight} Reps: {exersise.reps} Distance: {exersise.distance} Time: {exersise.time}</p>
      <Link to={'/edit/' + index}>Edit: </Link>
      <Link to={'/delete/' + exersise.key}>Delete: </Link>
      </li>)
    } else {
      return (<li className = "list1" key={exersise.key} onClick={(event)=>this.showInfo(event, exersise.key)}>
      {exersise.name}
      <div className = "button1">
      <Link to={'/edit/' + index}>
          <RaisedButton label = "Edit" />

      </Link>
      <Link to={'/delete/' + exersise.key}>
      <RaisedButton label = "Delete" /></Link>
      </div>

      </li>)
    }
  })
  return (
  <div className = "mid">
    <h1> Workout data </h1>
    <div className = "list">
      <ul>
        {list}
      </ul>
    </div>
  </div>
  );
}
}

function mapStateToProps (state) {
  return {
    contacts: state.contacts,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClick: function (data) {
      dispatch(clicked(data));
    }
  }
}

var MyList = connect(mapStateToProps, mapDispatchToProps)(MyListComponent);

export default MyList;
