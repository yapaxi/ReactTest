import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PendingClaims from './rma/PendingClaims.js'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import RMAClaimView from './rma/b2c/RMAClaimView.js'

const style = {
  marginTop: 60
}

class App extends Component {
  render() {
    return (
      <Router>
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
            <Route path="/claim/:id" component={RMAClaimView} />
            <Route path="/list" component={PendingClaims} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

