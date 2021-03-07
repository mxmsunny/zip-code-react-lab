import React, { useState } from 'react';
import CitySearchField from './components/CitySearchField';
import ToggleView from './components/ToggleView'
import './App.css';

const CitySearch = () => {
  const [cityName, setCityName] = useState('');
  const [zipCodes, setZipCodes] = useState([]);

  const handleCityChange = async (e) => {
    let currCity = e.target.value;
    let regex = /^[^0-9]+$/;

    if (currCity.match(regex) !== null) {
      let city = currCity.toUpperCase();
      await fetch(`http://ctp-zip-api.herokuapp.com/city/${city}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Invalid City Name');
          }
          return response.json();
        })
        .then(success => {
          setZipCodes(success);
        })
        .catch(err => {
          setZipCodes([]);
          console.log(err);
        })

      setCityName(city);

    } else {
      setCityName([]);
    }

  }

  return (
    <div>

      <div className="App-header">
        <h2>City Search</h2>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 mx-auto">
            <CitySearchField onChange={e => handleCityChange(e)} />
          </div>
        </div>
      </div>

      <div className="container">
        {zipCodes.length > 0 ? <ToggleView fetchedZip={zipCodes}/> :
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <h4 className="text-center">No results</h4>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default CitySearch;
