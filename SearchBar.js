import React from 'react';

function SearchBar(props) {
  return (
    <input
      type="text"
      placeholder="Buscar"
      className="Search"
      onChange={(e) => props.onSearch(e.target.value)}
      value={props.value}
    />
  );
}

export default SearchBar;
