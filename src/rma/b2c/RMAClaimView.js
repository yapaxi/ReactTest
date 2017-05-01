import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RMAService from '../../services/RMAService.js';

const Style = {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    backgroundColor: "whitesmoke",
    height: 150,
}

class RMAClaimView extends Component {

    constructor(props){
        super(props);

        this.state = {
            return: null,
            isLoading: true,
            inputEnabled: true
        }
        this.version = 0;
        this.handleNewReturn = this.handleNewReturn.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    handleNewReturn(returnId) {
        this.version = this.version + 1;
        const newVersion = this.version;
        RMAService.getReturn(returnId).then(e => {
            if (newVersion === this.version) {
                this.setState({
                    return: e,
                    isLoading: false,
                    inputEnabled: true
                })
            }
        });
    }

    handleAction(action) {
        this.setState({inputEnabled: false});
        RMAService
            .invokeAction(this.props.match.params.id, action)
            .then(() => this.handleNewReturn(this.props.match.params.id));
    }

    componentDidMount() {
        this.handleNewReturn(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.setState({isLoading: true});
            this.handleNewReturn(nextProps.match.params.id);
        }
    }

    render() {
        return (
            <div style={Style}>
                {this.state.isLoading 
                    ? <div>Loading...</div>
                    : <div>
                        <h2>{this.props.match.params.name}</h2>
                        <div>id: {this.props.match.params.id}</div>
                        <ReturnView returnObj={this.state.return} actionHandler={this.handleAction} inputEnabled={this.state.inputEnabled}/>
                      </div>}
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
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    })
}


export default RMAClaimView