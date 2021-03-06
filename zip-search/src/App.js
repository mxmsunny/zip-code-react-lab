import React, { useState } from 'react';
import Zip from './zip-search';
import City from './city-search';
import './App.css';

const App = () => {
  const [view, setView] = useState(0);

  const handleClick = () => {
    if (view === 0) {
      setView(1);
    } else {
      setView(0);
    }
  }

  return (
    <div>
      <div className="d-flex py-4 justify-content-center body-bg-color">
        <button className="btn btn-light" type="button" onClick={handleClick}>Click here to do a {view === 0 ? 'City-Search' : 'Zip-Search'}</button>
      </div>
      {view === 0 ? <Zip /> : <City />}
    </div>
  );
}

export default App;