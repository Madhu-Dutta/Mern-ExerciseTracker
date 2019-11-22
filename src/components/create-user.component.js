import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  //Constructor, props binding and initiate state

  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ""
    };
  }
  //All other Methods
  //React lifecycle method which gets called right before component is displayed on page
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username
    };
    console.log(user);

    //Call http POST request on axios
    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => console.log(res.data))
      .catch();

    //Instead of going back to home page. Give the user a option to enter another username
    this.setState({
      username: ""
    });
  }

  //View in UI
  render() {
    return (
      <div>
        <h3>Create New Excercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
