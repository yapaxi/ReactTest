import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RMAService from '../services/RMAService.js';
import { Link } from 'react-router-dom';

class PendingClaims extends Component {

    constructor(props){
        super(props);

        this.state = {
            claims: 0,
            isPending: true
        }
    }

    componentDidMount() {
        console.log('111');
        RMAService.getClaims().then(e => {
            this.setState({
                claims: e,
                isPending: false
            });
        });
    }

    render() {
        return (
            <div>
                { !this.state.isPending && <RMAClaimList claims={this.state.claims} /> }
            </div>
        )
    }
}


export const RMAClaimList = ({claims}) => (
    <div>
        <h2></h2>
        <table className="table">
            <caption>Claims</caption>
            <tbody>
                <tr>
                    <th>Claim Id</th>
                    <th>SellingVendorId</th>
                    <th>PurchaseOrderId</th>
                    <th>VenueReturnId</th>
                    <th>Is Rejected</th>
                </tr>
            { claims && claims.slice(0, 100).map(e => <RMAClaim key={e.id} id={e.id} claim={e}/>) }
            </tbody>
        </table>
    </div>
)

export const RMAClaim = ({id, claim}) => (
    <tr>
        <td>{<Link to={`/claim/${id}`}>{id}</Link>}</td>
        <td>{claim.sellingVenueId}</td>
        <td>{claim.purchaseOrderId}</td>
        <td>{claim.venueReturnId}</td>
        <td>{(claim.isRejected && claim.isRejected.toString()) || "false"}</td>
    </tr>
)

export const claim = PropTypes.shape({
    id: PropTypes.string,
    customerId: PropTypes.number,
    dateOfSale: PropTypes.string,
    orderId: PropTypes.orderId,
    purchaseOrderId: PropTypes.string,
    isRejected: PropTypes.bool,
    venueReturnId: PropTypes.string,
    sellingVenueId: PropTypes.number
})

RMAClaim.propTypes = {
    claim: claim,
    id: PropTypes.string.isRequired
}

RMAClaimList.propTypes = {
    claims: PropTypes.arrayOf(claim)
}

export default PendingClaims;