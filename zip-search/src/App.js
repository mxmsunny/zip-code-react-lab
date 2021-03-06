import React, { Component } from 'react';
import './App.css';

function City({ location, state, long, lat, population, wages }) {
    return (
        <div className="card">
            <div className="card-header font-weight-bold">
                {location}
            </div>
            <div className="card-body">
                <ul>
                    <li className="card-text">State: {state}</li>
                    <li className="card-text">Location: ({lat}, {long})</li>
                    <li className="card-text">Population (estimated): {population ? population : 'unknown'}</li>
                    <li className="card-text">Total Wages: {wages ? wages : 'unknown'}</li>
                </ul>
            </div>
        </div>
    );
}

function ZipSearchField({ onChange }) {
    return (
        <div className="my-4 d-flex justify-content-center">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Zip Code</span>
                </div>
                <input className="form-control" type='text' onChange={onChange} />
            </div>
        </div>
    )
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zipCode: '',
            cityData: []
        }
    }

    async zipChanged(e) {
        let zip = e.target.value;
        let digitReg = /^[0-9]+$/; //using regex with the suggestion of a classmate

        //match method returns array if match, null if not. with the regex here, it will return null if it is not a digit.
        if (zip.length === 5 && zip.match(digitReg) !== null) {
            await fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Invalid Zip Code');
                    }
                    return response.json();
                })
                .then(success => {
                    this.setState({
                        cityData: success
                    })
                })
                .catch(err => {
                    this.setState({ cityData: [] });
                    console.log(err);
                });

            this.setState({
                zipCode: zip
            })
        } else {
            this.setState({ cityData: [] });
        }
    }

    //make the city display dynamically
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Zip Code Search</h2>
                </div>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-6 mx-auto">
                            <ZipSearchField onChange={e => this.zipChanged(e)} />
                        </div>
                    </div>
                    {this.state.cityData.length > 0 ?
                        this.state.cityData.map((item) => {
                            return (
                                <div className="row mb-3 d-flex justify-content-center" key={item.RecordNumber}>
                                    <div className="col-lg-6 mx-auto">
                                        <City
                                            location={item.LocationText}
                                            long={item.Long}
                                            lat={item.Lat}
                                            state={item.State}
                                            population={item.EstimatedPopulation}
                                            wages={item.TotalWages} />
                                    </div>
                                </div>
                            )
                        }
                        )
                        :
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
}

export default App;
