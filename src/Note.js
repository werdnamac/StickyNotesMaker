import React from "react";
// the Note method takes info from App via props
// if info was entered in the title or description field,
// Note captures both the new title or description info
// and the existing note ID
// with props.onType, we cal the onType method in Apps
// and pass it the ID, whether the input field was the title or description field,
//  and the text that was entered into the field

const Note = (props) => {
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "description", updatedValue);
  };

  // this function is actuated when someone clicks on a note's X
  // it passes the id of that note to the deleteNote function in App
  const clickDelete = () => {
    props.deleteNote(props.note.id);
  };

  // return the updated note info --
  //  either a new tilte or a new description
  // we also connect the X to the "note__delete" class
  return (
    <li className="note">
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        onChange={updateDescription}
      />
      <span className="note__delete" onClick={clickDelete}>
        X
      </span>
    </li>
  );
};

// export the new note (where does it go?)
export default Note;
