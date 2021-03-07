import React from 'react';

const CitySearchField = ({ onChange }) => {
  return (
    <div className="my-4 d-flex justify-content-center">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">City Name</span>
        </div>
        <input className="form-control" type='text' onChange={onChange} />
      </div>
    </div>
  );
}

export default CitySearchField;