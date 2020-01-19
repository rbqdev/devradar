import React from "react";
import './style.css';

function DevItem({ dev }) {
  return (
    <li className="devs__item">
      <header>
        <img src={dev.avatar_url} alt=""/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p className="bio">
        {dev.bio}
      </p>
      <a href={`http://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Acessar perfl do o github</a>
    </li>
  )
};

export default DevItem;