import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {addContact, updateContact} from './actions.js';
import { connect } from 'react-redux';
import uid from 'uid'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
// import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import database, {User} from './database';
//import DatePickerControlled from './date';
import DatePicker from 'material-ui/DatePicker';
import {Link} from 'react-router-dom';
import axios from 'axios';


class UserDataFormComponent extends Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    //this.check_login();
    console.log(this.props.user)

    this.index = null;
    if (this.props.match.params.id) {
      this.index = this.props.match.params.id;
      this.state = {...this.props.contacts[this.index]};
    } else {
      this.state = {
         userName: props.user.uid, name: 'your name', BMI: '', bloodPressure: '', weight: '0', waist: '0', date:'0', email: '0',
      };
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.user)
  }



  update_state(event, key) {
    console.log(event);
    this.setState({[key]: event.target.value});
  }

  update_date(date) {
    console.log(date);
    this.setState({date: date});
  }




  handle_submit(event) {

    event.preventDefault();

    axios.post('http://localhost:8000/userData', {userName: this.props.user.uid ,userName: this.state.name, BMI: this.state.BMI, weight: this.state.weight, date: this.state.date, waist: this.state.waist, email: this.state.email})
      .then(() => {
        this.props.onSubmit({userName: this.props.user.uid ,userName: this.state.name, BMI: this.state.BMI, weight: this.state.weight, date: this.state.date, waist: this.state.waist, email: this.state.email});
        this.props.history.push("/list");
      })
      .catch(() => {
        alert('Error saving data.');
      });
  }


updateExersise(event) {
    console.log(this.index, this.state);
    this.props.onChange(this.index, {...this.state});
    this.props.history.push("/");
  }

  render() {
    console.log('date is', this.state.date)
    return (
      <div className="card">
        <Card className="md-card">
          <form onSubmit={event => this.handle_submit(event)}>
            <CardTitle title="User Data Form" subtitle={this.props.user.uid}/>
            <CardText>
              <TextField floatingLabelText="Your name"
                defaultValue={this.state.name}
                onChange={event => this.update_state(event, 'name')}/>
              <DatePicker floatingLabelText="date"
                defaultValue={this.state.date}
                onChange={(event, d) => this.update_date(d)}/>
              <TextField floatingLabelText="BMI"
                defaultValue={this.state.BMI}
                onChange={event => this.update_state(event, 'BMI')}/>
              <TextField floatingLabelText="Blood Pressure"
                defaultValue={this.state.bloodPressure}
                onChange={event => this.update_state(event, 'bloodPressure')}/>
              <TextField floatingLabelText="Your Weight"
                defaultValue={this.state.weight}
                onChange={event => this.update_state(event, 'weight')}/>
              <TextField floatingLabelText="waist"
                defaultValue={this.state.waist}
                onChange={event => this.update_state(event, 'waist')}/>
              <TextField floatingLabelText="email"
                defaultValue={this.state.email}
                onChange={event => this.update_state(event, 'email')}/>

            </CardText>
            <CardActions>
              <RaisedButton type="submit" label="Add" primary={true}/>
              <RaisedButton label="Update" primary={true} onClick={event => this.updateExersise(event)}/>
            </CardActions>
          </form>
        </Card>
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
    onSubmit: function (data) {
      dispatch(addContact(data));
    },
    onChange: function (index, data) {
      dispatch(updateContact(index, data));
    }
  }
}

var UserDataForm = connect(
  mapStateToProps, mapDispatchToProps
)(UserDataFormComponent);

export default UserDataForm;
