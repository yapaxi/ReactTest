import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PendingClaims from './rma/PendingClaims.js'

const style = {
  marginTop: 60
}

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar">1</span>
                <span className="icon-bar">2</span>
                <span className="icon-bar">3</span>
              </button>
              <a className="navbar-brand" href="#">RMA</a>
            </div>
          </div>
        </nav>
        <div className="container" style={style}>
          <PendingClaims />
        </div>
      </div>
    );
  }
}

export default App;

