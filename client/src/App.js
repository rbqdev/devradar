import React, { useState, useEffect } from 'react';
import api from "./services/api";

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

import './global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';

function App() {
  const [devs, setDevs] = useState([]);
  
  useEffect(() => {
    (async function loadDevs() {
      const { data } = await api.get('/devs');
      setDevs(data);
    })();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <h3>Cadastrar</h3>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul className="devs">
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main> 
    </div>
  );
}

export default App;
