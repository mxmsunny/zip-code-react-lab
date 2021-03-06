import React, { useState } from 'react';
import './App.css';

const CitySearch = () => {
  const [cityName, setCityName] = useState('');
  const [zipCodes, setZipCodes] = useState([]);

  const handleCityChange = async (e) => {
    let currCity = e.target.value;
    let regex = /^[^0-9]+$/;

    if (currCity.match(regex) !== null) {
      var city = currCity.toUpperCase();
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
    } else {
      setCityName(city);
    }

  }

  return (
    <div>

      <div className="App-header">
        <h2>City Search</h2>
      </div>

      <div className="container">
        <div className="my-4 d-flex justify-content-center">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">City Name</span>
            </div>
            <input className="form-control" type='text' onChange={e => handleCityChange(e)} />
          </div>
        </div>

        <div>
          {zipCodes.length > 0 ?
            zipCodes.map((zips, index) => {
              return (
                <div key={index}>
                  <div className="row mb-3 d-flex justify-content-center">
                    <p>{zips}</p>
                  </div>
                </div>
              )
            })
            :
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <h4 className="text-center">No results</h4>
              </div>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default CitySearch;
