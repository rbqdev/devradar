import React, { useState, useEffect } from "react";

import './style.css';

function DevForm({ onSubmit }) {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.log(error)
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithubUsername('');
    setTechs('');
    setLatitude('');
    setLongitude('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrap">
        <label htmlFor="github_username">Usuário do Github</label>
        <input 
          id="github_username" 
          name="github_username" 
          required
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}  
        />
      </div>

      <div className="input-wrap">
        <label htmlFor="techs">Tecnologias</label>
        <input 
          id="techs" 
          name="techs" 
          required
          value={techs}
          onChange={e => setTechs(e.target.value)} 
        />
      </div>
      
      <div className="input-group">
        <div className="input-wrap">
          <label htmlFor="latitude">Latitude</label>
          <input 
            id="latitude" 
            name="latitude"
            required 
            value={latitude}
            onChange={e => setLatitude(e.target.value)} 
          />
        </div>
          
        <div className="input-wrap">
          <label htmlFor="longitude">Longitude</label>
          <input 
            id="longitude" 
            name="longitude" 
            required 
            value={longitude}
            onChange={e => setLongitude(e.target.value)} 
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  )
};

export default DevForm;