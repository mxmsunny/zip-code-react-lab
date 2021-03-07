import React, { useState, useEffect } from 'react';

const CityInfo = ({ zip }) => {
  const [cityData, setCityData] = useState([]);

  const getCurrZipData = async (zip) => {
    const res = await fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`);
    const data = await res.json();
    setCityData(data);
  }

  useEffect(() => { getCurrZipData(zip) }, [zip]);

  return (
    <div>
      {cityData.map(city => {
        return (
          <div key={city.RecordNumber}>
            <h5 className= "card-subtitle mb-2 text-muted">{city.LocationText}</h5>
            <ul>
              <li className="card-text">State: {city.State}</li>
              <li className="card-text">Location: ({city.Lat}, {city.Long})</li>
              <li className="card-text">Population (estimated): {city.EstimatedPopulation ? city.EstimatedPopulation : 'unknown'}</li>
              <li className="card-text">Total Wages: {city.TotalWages ? city.TotalWages : 'unknown'}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default CityInfo;