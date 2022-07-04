import React from "react";

// pulling props from App
const Header = (props) => {
  // call the onSearch method with props
  // it is an event
  // the callSearch variable is set to the value
  // of the text that was searched
  const callSearch = (e) => {
    props.onSearch(e.target.value);
  };
  // filling in the header
  // 1. when the button is clicked, onClick is called
  // onClick calls the addNote method via props
  // so a new note is created
  // 2. input collects the searched for text
  // and sets the value variable equal to the searched text
  // 3. onChange calls the callSearch method above

  return (
    <header>
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <input
          className="search"
          type="text"
          placeholder="Type here to search..."
          value={props.searchText}
          onChange={callSearch}
        />
      </aside>
    </header>
  );
};

export default Header;
