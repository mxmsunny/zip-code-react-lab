import React, { Component } from 'react';
import './App.css';


function City({ location, state, long, lat, population, wages }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="card w-50">
        <div className="card-header font-weight-bold">
          {location}
        </div>
        <div className="card-body">
          <ul>
            <li className="card-text">State: {state}</li>
            <li className="card-text">Location: ({lat}, {long})</li>
            <li className="card-text">Population (estimated): {population}</li>
            <li className="card-text">Total Wages: {wages}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ZipSearchField({ onChange }) {
  return (
    <div className="container">
      <div className="my-4 d-flex justify-content-center">
        <div className="input-group mw-25" style={{ width: "300px" }}>
          <div className="input-group-prepend">
            <label className="input-group-text">Zip Code</label>
          </div>
          <input className="form-control" type='text' onChange={onChange} />
        </div>
      </div>
    </div>
  )
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      cityData: [],
      isResult: false
    }
  }

  async zipChanged(e) {
    let zip = e.target.value;

    fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
      .then(response => {
        if (this.state.isResult) {
          this.setState({
            isResult: false
          })
        }
        if (!response.ok) {
          throw new Error('Invalid Zip Code');
        }
        return response.json();
      })
      .then(success => {
        this.setState({
          cityData: success,
          isResult: true
        })
      })
      .catch(error => console.log(error));

    this.setState({
      zipCode: zip
    })
  }

  //make the city display dynamically
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onChange={e => this.zipChanged(e)} />
        <div className="container">
          {this.state.isResult ?
            <ul>
              {
                this.state.cityData.map((item, index) => {
                  return (
                    <li className="mb-3" style={{ listStyleType: 'none' }} key={index}>
                      <City
                        location={item.LocationText}
                        long={item.Long}
                        lat={item.Lat}
                        state={item.State}
                        population={item.EstimatedPopulation}
                        wages={item.TotalWages} />
                    </li>
                  )
                }
                )
              }
            </ul>
            :
            <h4 className="d-flex justify-content-center">No results</h4>
          }
        </div>
      </div>
    );
  }
}

export default App;
