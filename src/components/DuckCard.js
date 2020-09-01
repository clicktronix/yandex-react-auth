import React from 'react';
import './styles/DuckCard.css';

function DuckCard (props) {
  let { duck }  = props;
  return (
    <div className="duck-card">
      <div className="duck-card__image">
        <img className="duck-card__png" src={duck.img} />
      </div>
      <div className="duck-card__desc">
        <p className="duck-card__name">
          {duck.name}
        </p>
        <p className="duck-card__text">
          {duck.description}
        </p>
      </div>
    </div>
  )
}

export default DuckCard;