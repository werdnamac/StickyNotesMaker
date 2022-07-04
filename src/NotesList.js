import React from "react";
import Note from "./Note.js";

// update notes list with only the searched-for notes
// KSM checks each note to see if dMS is True
// SM filters out all the notes where KSM and therefore dMS are True
const NotesList = (props) => {
  const keepSearchMatches = (note) => note.doesMatchSearch;
  const searchMatches = props.notes.filter(keepSearchMatches);
  // for each note, when someone types in the note, call the onType method in Apps
  // and pass it each note and its key
  const renderElement = (note) => (
    <Note
      deleteNote={props.deleteNote}
      onType={props.onType}
      note={note}
      key={note.id}
    />
  );
  // map over all the notes that matched the search
  // return only those notes to the notes-list list
  const noteElements = searchMatches.map(renderElement);
  return <ul className="notes-list"> {noteElements} </ul>;
};

export default NotesList;
