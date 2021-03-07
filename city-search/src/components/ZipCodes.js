import React from 'react';

const ZipCodes = ({ zips }) => {
  return (
    <div className="row mb-3 d-flex justify-content-center">
      <div className="col-lg-6">
        <h3 className="text-center">{zips}</h3>
      </div>
    </div>
  );
}

export default ZipCodes;