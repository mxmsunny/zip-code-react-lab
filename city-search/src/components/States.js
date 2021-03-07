import React, {useState, useEffect} from 'react';

const States = ({zips}) => {
  const [cityData, setCityData] = useState([]);

  const getCurrZipData = async (zip) => {
    const res = await fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`);
    const data = await res.json();
    setCityData(data);
  }

  useEffect(() => { getCurrZipData(zips) }, [zips]);

  const allStates = cityData.map(city => city.State);
  const uniqueStates = allStates.filter((val,index)=> allStates.indexOf(val) === index);

  return(
    <div className="row mb-3 d-flex justify-content-center">
      <div className="col-lg-6">
        {uniqueStates.map((state,index) => {
          return(
            <h3 className="text-center" key={index}>{state}</h3>)
        })}
      </div>
    </div>
  );
}

export default States;