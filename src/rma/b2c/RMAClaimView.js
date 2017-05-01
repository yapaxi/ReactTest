import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-refetch'

const Style = {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    backgroundColor: "whitesmoke",
    height: 150,
}

class RMAClaimView extends Component {
    render() {
        const { returnFetch } = this.props;
        let jsx;
        if (returnFetch.pending) {
            jsx = <div>Loading...</div>
        } else if (returnFetch.rejected) {
            jsx = <div>Error: {returnFetch.reason}</div>
        } else if (returnFetch.fulfilled) {
            jsx = <div>
                    <h2>{this.props.match.params.name}</h2>
                    <div>id: {this.props.match.params.id}</div>
                    <ReturnView returnObj={returnFetch.value} 
                                actionHandler={this.props.invokeAction} 
                                inputEnabled={true}/>
                  </div>
        }
        return (
            <div style={Style}>
                {jsx}
            </div>
        )
    }
}

const ReturnView = ({returnObj, actionHandler, inputEnabled}) => (
    <div>
        <div style={{marginTop: 10}}>
            {returnObj.availableActions.map(e => <ActionButton inputEnabled={inputEnabled}  key={e.code} name={e.name} code={e.code} handler={actionHandler} />)}
        </div>
    </div>
)

const ActionButton = ({inputEnabled, code, name, handler}) => (
    <button type="Button" className={"btn btn-default " + (inputEnabled ? "" : "disabled")} onClick={() => handler(code)}>
        {name}
    </button>
)

ActionButton.propTypes = {
    inputEnabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    code: PropTypes.number.isRequired,
    handler: PropTypes.func
}

ReturnView.propTypes = {
    inputEnabled: PropTypes.bool,
    returnObj: PropTypes.shape({
        return: PropTypes.any,
        availableActions: PropTypes.arrayOf(PropTypes.shape({
            code: PropTypes.number,
            name: PropTypes.string
        }))
    }),
    actionHandler: PropTypes.func
}

RMAClaimView.propTypes = {
    returnFetch: PropTypes.any,
    refresh: PropTypes.func,
    invokeAction: PropTypes.func,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    })
}


export default connect(props => {
    const url = `http://localhost:51231/api/returns/${props.match.params.id}`;
    return {
        returnFetch: url,
        invokeAction: (action) => ({
            actionInvocation: {
                url: `http://localhost:51231/api/returns/${props.match.params.id}`,
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    action: action
                }),
                andThen: () => ({
                    returnFetch: {
                        url: url,
                        force: true,
                        refreshing: true
                    }
                })
            }
        }),
        refresh: () => ({
            returnFetch: {
                url: url,
                force: true,
                refreshing: true
            }
        })
    }
})(RMAClaimView)