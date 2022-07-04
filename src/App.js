import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],

    searchText: ""
  };

  addNote = () => {
    // create a new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };

    // add newNote to the existing notes array
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  onType = (editMeId, updatedField, updatedValue) => {
    // edtitMeId ==  key of the note we want to update
    // updatedKey == are we updating the title or the description field?
    // updatedValue == value that was entered into the text field

    // updatedNotes maps over state, extracting every note
    // with each note, we first check if it has the id of the note we want to edit
    // if it doesn't, we just return the note unchanged
    // if it does, we change either the title or the description to
    // updatedValue
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedField === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    // update the content of notes to the updatedNotes array
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();

    const updatedNotes = this.state.notes.map((note) => {
      //if there is no text entered, everything stays as it was
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
        // looking to see if we have a match
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        // looking to see if either title or description matches the searched text
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        // we have a match if either tM or dM is True
        const hasMatch = titleMatch || descriptionMatch;
        //the value of hasMatch is True if there's a match and false otherwise
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    //update the states of notes and searchText
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  // filter through all the notes in state,
  // selecting all notes that do not match the
  // noteId of the note we selected for deletion
  // then set state to the remaining notes
  deleteNote = (noteId) => {
    const remainingNotes = this.state.notes.filter(
      (note) => note.id !== noteId
    );
    this.setState({ notes: remainingNotes });
  };

  // when state changes, we save the current
  // version of notes to local storage
  componentDidUpdate() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  // when component mounts, it checks if anything
  // is saved in localStorage and then loads that

  componentDidMount() {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  // pass the  oS, aN, and sT methods to Header
  // pass the oT & dN methods and the notes array to NotesList
  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          addNote={this.addNote}
          searchText={this.state.searchText}
        />
        <NotesList
          deleteNote={this.deleteNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
