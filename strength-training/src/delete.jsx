
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import {deleteAttr} from './actions.js';

import uid from 'uid'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
// import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import database, {User} from './database';

class MyDeleteComponent extends Component {
  constructor(props) {
    super(props);

    this.history = props.history;


    this.state = {
      key: props.match.params.id, 
      contacts: []
    };
  }



  deletePerson(event) {
    var key = this.props.key;
    let idIndex = this.props.contacts.findIndex((contact)=>{
      if (contact.key === key) {return contact}
    })
      this.props.onSubmit(idIndex);
      this.props.history.push('/list')
    }

    sort_contacts(temp_contacts) {
       var sorted = temp_contacts.sort(function(a, b){
       var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
       if (nameA < nameB) //sort string ascending
        return -1;
       if (nameA > nameB)
        return 1;
       return 0; //default return value (no sorting)
      });

      this.setState({contacts: sorted});

    }


    setHome(event){
      this.props.history.push('/')
    }

  render() {
    return (
      <div className = "delete">
       <h3>Are u sure you want to delete this? {this.props.contacts.userId}</h3>
       <RaisedButton className = "button" label="Delete" primary={true} onClick={event => this.deletePerson(event)}/>
       <RaisedButton label="Cancel" primary={true} onClick={event => this.setHome(event)}/>
     </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    contacts: state.contacts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index) {
      dispatch(deleteAttr(index));
    }
  }
}

var MyDelete = connect(
  mapStateToProps, mapDispatchToProps
)(MyDeleteComponent);

export default MyDelete;
