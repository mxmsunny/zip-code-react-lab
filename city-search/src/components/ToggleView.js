import React, { useState } from 'react';
import ZipCodes from './ZipCodes';
import CityResult from './CityResult';
import States from './States';

const ToggleView = ({ fetchedZip }) => {
  const [viewIndex, setViewIndex] = useState(0);

  return (
    <div>
      <div className="row mb-3 d-flex justify-content-center">
        <button type="button" className="col-lg-2 mx-3 mb-2 btn btn-outline-secondary" onClick={() => setViewIndex(0)}>Hide City Details</button>
        <button type="button" className="col-lg-2 mx-3 mb-2 btn btn-outline-secondary" onClick={() => setViewIndex(1)}>Show City Details</button>
        <button type="button" className="col-lg-2 mx-3 mb-2 btn btn-outline-secondary" onClick={() => setViewIndex(2)}>Display Found States</button>
        <button type="button" className="col-lg-2 mx-3 mb-2 btn btn-outline-secondary" onClick={() => setViewIndex(3)}>Group by States</button>
      </div>

      {fetchedZip.map((zip, index) => {
        switch (viewIndex) {
          case 0:
            return (
              <ZipCodes zips={zip} key={index} />
            );
          case 1:
            return (
              <CityResult zips={zip} key={index}/>
            );
          case 2:
            return (
              <States zips={zip} key={index}/>
            );
          case 3:
            return (
              null
            );
          default:
            return (null);
        }
      })}

    </div>
  );
}

export default ToggleView;