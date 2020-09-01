import React from 'react';
import DuckCard from './DuckCard.js';
import data from '../data.js';
import './styles/DuckList.css';

function DuckList () {
  let { ducks } = data;
  return (
    <div className="duck-list">
      {
        ducks.map((duck) => {
          return (
            <DuckCard duck={duck} key={duck.id} />
          )
        })
      }
    </div>
  )
}

export default DuckList;