import React, { Component } from 'react';
import './App.css';


function City({ location, state, long, lat, population, wages }) {
  return (
    <div className="card">
      <div className="card-header">
        {location}
      </div>
      <div className="card-body">
        <ul>
          <li className="card-text">State: {state}</li>
          <li className="card-text">Location: ({lat},{long})</li>
          <li className="card-text">Population (estimated): {population}</li>
          <li className="card-text">Total Wages: {wages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({ onChange }) {
  return (
    <div>
      <label>Zip Code:</label>
      <input type='text' onChange={onChange} />
    </div>
  )
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      cities: [],
      isResult: false
    }
  }

  async zipChanged(e) {
    await this.setState({
      zipCode: e.target.value
    })

    await fetch(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zipCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (this.state.isResult){
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
          cities: success,
          isResult: true
        })
      })
      .catch(error => console.log(error));
  }

  //make the city display dynamically
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onChange={e => this.zipChanged(e)} />
        <div>
          {this.state.isResult ?
            <ul>
              {
                this.state.cities.map((item, index) => {
                  return (
                    <li style={{ listStyleType: 'none' }} key={index}>
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
            <h4>No results</h4>
          }
        </div>
      </div>
    );
  }
}

export default App;
