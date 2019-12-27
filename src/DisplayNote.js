import React, { Component, Fragment } from "react";
import deleteImg from "./img/delete.png";
import "./DisplayNote.css";
export default class DisplayNote extends Component {
  render() {
    const notes = this.props.notes;
    return notes.map(({ todos, title }, index) => {
      return (
        <div key={index} className="noteWrapper">
          <div className="todo-header">
            <div className="note-title">{title}</div>
            <img
              className="note-delete"
              src={deleteImg}
              style={{ height: "20px", width: "20px" }}
              onClick={() => this.props.deleteNoteHandler(index)}
            />
          </div>
          <hr />
          {todos.map(({ todo, marked }, todoIndex) => (
            <div key={todoIndex}>
              <input
                type="checkbox"
                checked={marked}
                onChange={() => this.props.toggleCheckBox(index, todoIndex)}
              />
              <span className={marked ? "marked" : ""}> {todo}</span>
            </div>
          ))}
        </div>
      );
    });
  }
}
