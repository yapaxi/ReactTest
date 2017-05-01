import React, { Component } from 'react';
import RMAListPreview from './RMAListPreview.js';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ExternalMarketplacesList from './b2c/ExternalMarketplacesList.js';
import NotSupported from './NotSupported.js';
import RMAListContainer from './b2c/RMAList.js';
import RMAService from '../services/RMAService.js';
import RMAClaimView from './b2c/RMAClaimView.js'

class PendingClaims extends Component {

    constructor(props){
        super(props);

        this.state = {
            b2cAutoPendingClaims: 0,
            b2cAutoPendingCount: 0,
            b2cAutoRejectedCount: 0,
            isPending: true
        }
    }

    componentDidMount() {
        RMAService.getReturns().then(e => {
            this.setState({
                b2cAutoPendingClaims: e,
                b2cAutoPendingCount: e.length,
                b2cAutoRejectedCount: e.filter(q => q.isRejected).length,
                isPending: false
            });
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <h2>Pending claims</h2>
                    <div>
                        <div style={{display: "inline-block", width: "30%"}}>
                            <ul className="list-group">
                                <RMAListPreview key="b2c-vip" name="B2C - Vipoutlet" pendingCount={1} redirectTo="/b2c/notsupported" />
                                <RMAListPreview 
                                    key="b2c-auto" 
                                    name="B2C - External Marketplaces" 
                                    pendingCount={this.state.b2cAutoPendingCount} 
                                    rejectedCount={this.state.b2cAutoRejectedCount} 
                                    isPending={this.state.isPending}
                                    redirectTo="/b2c/marketplaces" />
                                <RMAListPreview key="b2b" name="B2B" pendingCount={2} redirectTo="/b2c/notsupported" />
                            </ul>
                        </div>
                        <div style={{display: "inline-block", width: "69%", marginLeft: 10, marginTop: -10, verticalAlign: "top"}}>
                            <Route path="/b2c/marketplaces" component={ExternalMarketplacesList} />
                            <Route path="/b2c/notsupported" component={NotSupported} />
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <Route path="/b2c/marketplaces/:name/:id" component={RMAClaimView} />
                        <Route path="/b2c/marketplaces/:name" component={RMAListContainer} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default PendingClaims;