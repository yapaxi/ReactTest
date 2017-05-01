import React from 'react';
import './RMAListPreview.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const RMAListPreview = ({name, isPending, pendingCount, rejectedCount, redirectTo}) => (
    <li className="list-group-item claim-list">
        <Link to={redirectTo}>
            <div>
                {name}
                <div className="badge-container">
                    {isPending
                        ? <PendingBadge />
                        : <LoadedBadge pendingCount={pendingCount} rejectedCount={rejectedCount} />}
                </div>
            </div>
        </Link>
    </li>
)

const PendingBadge = () => (
    <span className="badge" style={{color: "white", backgroundColor: "gray"}}>...</span>
);

const LoadedBadge = ({pendingCount,rejectedCount}) => (
    <span>
        <span className="badge">{pendingCount}</span>
        {rejectedCount && <span className="badge" style={{marginLeft: 5, backgroundColor: "red"}}>{rejectedCount}</span>}
    </span>
);

LoadedBadge.propTypes = {
    pendingCount: PropTypes.number,
    rejectedCount: PropTypes.number
}

RMAListPreview.defaultProps = {
    isPending: false
}

RMAListPreview.propTypes = {
    name: PropTypes.string.isRequired,
    pendingCount: PropTypes.number.isRequired,
    rejectedCount: PropTypes.number,
    redirectTo: PropTypes.string.isRequired,
    isPending: PropTypes.bool
}

export default RMAListPreview;