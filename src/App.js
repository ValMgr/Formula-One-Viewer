import React from 'react';

import "./assets/css/App.css";
import F175 from './assets/images/F1-75-Barcelona.jpeg';

import fetchAPI from "./services/fetchAPI";

function App() {
  return (
    <div className="App">
        <h2>Formula One data project</h2>
        <div className='row'>
          <div className='col-md-6'>
            <p>
            Welcome on this React application made for university project is fetching data from <a href="https://ergast.com/">ergast</a> motosport API. <br></br>
            This application allows to retrieve all informations about Formula One since the first championship in 1950. You can get all informations about seasons, drivers, constructors etc... <br></br>
            You can also get all race data like fastest lap, pit stops, average speed and lot of other features.
            </p>
          
          </div>
          <div className='col-md-6'>
            <img src={F175} alt="F1-75 Barcelona" />
          </div>
        </div>
    </div>
  );
}

export default App;
