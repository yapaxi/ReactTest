import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RMAService from '../../services/RMAService.js';

export default class RMAListContainer extends Component {

    constructor(props){
        super(props);

        this.version = 0;

        this.state = {
            claims: [],
            isPending: false
        }
    }

    componentDidMount() {
        RMAService.getPendingReturns(this.props.match.params.name).then(e => {
            this.setState({
                claims: e
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.name !== this.props.match.params.name) {

            this.version = this.version + 1;
            const newVersion = this.version;

            this.setState({
                claims: [],
                isPending: true
            })
            
            RMAService.getPendingReturns(nextProps.match.params.name).then(e => {

                if (newVersion === this.version) {
                    this.setState({
                        claims: e,
                        isPending: false
                    });
                }
            });
        }
    }

    render() {
        if (this.state.isPending) {
            return (<div>Loading...</div>)
        }
        return <RMAClaimList marketplace={this.props.match.params.name} claims={this.state.claims} />
    }
}

const RMAClaimList = ({marketplace, claims}) => (
    <div>
        <h2></h2>
        <table className="table">
            <caption>Claims for {marketplace} marketplace</caption>
            <tbody>
                <tr>
                    <th>Claim Id</th>
                    <th>Marketplace</th>
                    <th>Is Rejected</th>
                </tr>
            { claims && claims.map(e => <RMAClaim key={e.id} id={e.id} marketplace={marketplace} claim={e}/>) }
            </tbody>
        </table>
    </div>
)

const RMAClaim = ({id, marketplace, claim}) => (
    <tr>
        <td><Link to={"/b2c/marketplaces/" + marketplace + '/' + id}>{id}</Link></td>
        <td>{marketplace}</td>
        <td>{(claim.isRejected && claim.isRejected.toString()) || "false"}</td>
    </tr>
)

const claim = PropTypes.shape({
    isRejected: PropTypes.bool
})

RMAClaim.propTypes = {
    marketplace: PropTypes.string.isRequired,
    claim: claim,
    id: PropTypes.string.isRequired
}

RMAClaimList.propTypes = {
    marketplace: PropTypes.string.isRequired,
    claims: PropTypes.arrayOf(claim)
}

RMAListContainer.propTypes = {
    match: PropTypes.any
}