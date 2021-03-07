import React from 'react';
import CityInfo from './CityInfo';

const CityResult = ({ zips }) => {
  return (
    <div className="row mb-3 d-flex justify-content-center">
      <div className="col-lg-6">
        <div className="card">
          <div className="card-header font-weight-bold">
            <h4 className="text-center">{zips}</h4>
          </div>
          <div className="card-body">
            <CityInfo zip={zips} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityResult;