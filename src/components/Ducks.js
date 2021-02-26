import React from 'react';
import NavBar from './NavBar.js';
import DuckList from './DuckList.js';

function Ducks({ onSignOut }) {
  return (
    <>
      <NavBar onSignOut={onSignOut} />
      <DuckList />
    </>
  )
}

export default Ducks;