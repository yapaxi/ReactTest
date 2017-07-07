import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-refetch'
import { RMAClaimList } from '../PendingClaims.js'

const Style = {
}

class RMAClaimView extends Component {

    shouldComponentUpdate(nextProps) {
        const nextIsAfterPostPendingRefresh = this.props.isPost.value && nextProps.returnFetch.pending;
        return !nextIsAfterPostPendingRefresh;
    }
    
    render() {
        const { returnFetch, linesFetch } = this.props;
        let jsx;
        if (returnFetch.pending || linesFetch.pending) {
            jsx = <div>Loading...</div>
        } else if (returnFetch.rejected) {
            jsx = <div>Error: {returnFetch.reason}</div>
        } else if (returnFetch.fulfilled && linesFetch.fulfilled) {
            jsx = <div>
                    <RMAClaimList claims={[returnFetch.value]} />
                    <RMAClaimLines linesFetch={linesFetch} props={this.props} />
                  </div>
        }
        return (
            <div style={Style}>
                {jsx}
            </div>
        )
    }
}

const RMAClaimLines = ({linesFetch, props}) => (
    <table className="table">
        <caption>Lines</caption>
        <tbody>
            <tr>
                <th>Id</th>
                <th>Quantity</th>
                <th>Refund $</th>
                <th>Shipping $</th>
                <th>Shipping Tax $</th>
                <th>Tax $</th>
                <th>Expectation UPC Template</th>
            </tr>
            { linesFetch.fulfilled && linesFetch.value.map(e => <RMAClaimLine key={e.id} line={e} expectationFetch={props[e.id]} />)}
        </tbody>
    </table>
)

const RMAClaimLine = ({line, expectationFetch}) => (
    <tr>
        <td>{line.id}</td>
        <td>{line.quantity}</td>
        <td>{line.refundAmount.amount}</td>
        <td>{line.shippingAmount.amount}</td>
        <td>{line.shippingTax.amount}</td>
        <td>{line.tax.amount}</td>
        <td>{ expectationFetch && expectationFetch.fulfilled && expectationFetch.value[0].productProperties.upcTemplateId }</td>
    </tr>
)

RMAClaimLines.propTypes = {
    linesFetch: PropTypes.any,
    props: PropTypes.any
}

RMAClaimLine.propTypes = {
    line: PropTypes.any,
    expectationFetch: PropTypes.any
}

RMAClaimView.propTypes = {
    isPost: PropTypes.shape({
        value: PropTypes.bool
    }),
    returnFetch: PropTypes.any,
    linesFetch: PropTypes.any,
    actionInvocation: PropTypes.any,
    refresh: PropTypes.func,
    invokeAction: PropTypes.func,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    })
}

const mapLines = (array, getUrl) => {
    let r = {}
    array.forEach((e) => {
        r[e.id] = {
            url: getUrl(e),
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        }
    });
    return r;
} 

export default connect(props => {
    const url = `http://localhost:55147/claims/${props.match.params.id}`;
    return {
        returnFetch: {
            url : url,
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        },        
        linesFetch: {
            url: `http://localhost:55147/claims/${props.match.params.id}/claimLines`,
            method: "GET",
            headers: {'Content-Type': 'application/json'},
            andThen: (lines) => (
                mapLines(lines, (line) => `http://localhost:55147/claims/${props.match.params.id}/claimLines/${line.id}/expectations`)
            )
        },
        isPost: {
            value: false
        },
        invokeAction: (action) => ({
            isPost: {
                value: true
            },
            actionInvocation: {
                url: `http://localhost:55147/api/returns/${props.match.params.id}`,
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    action: action
                }),
                andThen: () => ({
                    returnFetch: {
                        url: url,
                        force: true
                    },
                    isPost: {
                        value: false
                    }
                })
            }
        }),
        refresh: () => ({
            returnFetch: {
                url: url,
                force: true
            },
            isPost: {
                value: false
            }
        })
    }
})(RMAClaimView)