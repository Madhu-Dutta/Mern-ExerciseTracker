import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <Link
        to="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </Link>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [], search: "" };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/excercises/").then(response => {
      this.setState({ exercises: response.data });
    });
  }

  updateSearch(event) {
    //Grabbing input value entered and limit the entered value to 20characters
    this.setState({
      search: event.target.value.substring(0, 20)
    });
  }

  deleteExercise(id) {
    axios.delete("http://localhost:5000/excercises/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  exerciseList() {
    let filteredExcercise = this.state.exercises.filter(excercise => {
      //If the username exists return the user detail or return the excercise list empty
      return (
        excercise.username
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    return filteredExcercise.map(currentexercise => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <input
          className="searchbar"
          type="text"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
