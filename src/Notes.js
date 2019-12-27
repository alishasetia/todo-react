import React, { Component } from "react";
import DisplayNote from "./DisplayNote";
import immutableUpdate from "immutability-helper";
import "./Notes.css";
export default class Notes extends Component {
  state = {
    notes: [],
    tempTitle: "",
    tempTodo: ""
  };

  addTitleHandler = e => {
    this.setState({ tempTitle: e.target.value });
  };

  textChangedHandler = e => {
    this.setState({ tempTodo: e.target.value });
  };

  addNoteHandler = () => {
    if (this.state.tempTodo.trim()) {
      const newTodo = {
        title: this.state.tempTitle,
        todos: this.state.tempTodo
          .trim()
          .split("\n")
          .map(todo => ({ todo, marked: false }))
      };

      this.setState(
        immutableUpdate(this.state, {
          notes: {
            $push: [newTodo]
          },
          tempTitle: { $set: "" },
          tempTodo: { $set: "" }
        })
      );
    }
  };

  deleteNoteHandler = index => {
    const notes = [...this.state.notes];
    notes.splice(index, 1);
    this.setState({ notes: notes });
  };

  toggleCheckBox = (index, todoIndex) => {
    this.setState(
      immutableUpdate(this.state, {
        notes: { [index]: { todos: { [todoIndex]: { $toggle: ["marked"] } } } }
      })
    );
  };

  render() {
    const { tempTitle, tempTodo } = this.state;
    return (
      <div className="notesWrapper">
        <div>
          <input
            value={tempTitle}
            className="input-todo title-input"
            type="text"
            placeholder="Enter title of the note"
            onChange={this.addTitleHandler}
          />
          <br />
          <textarea
            cols="22"
            className="input-todo"
            placeholder="Add a note"
            value={tempTodo}
            onChange={this.textChangedHandler}
          />
        </div>
        <button className="add-todo" onClick={this.addNoteHandler}>
          Add Todo
        </button>
        <div>
          <DisplayNote
            notes={this.state.notes}
            deleteNoteHandler={this.deleteNoteHandler}
            toggleCheckBox={this.toggleCheckBox}
          />
        </div>
      </div>
    );
  }
}
