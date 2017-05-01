import React, {Component} from 'react';
import './ExternalMarketplacesList.css';
import { Link } from 'react-router-dom';

class ExternalMarketplacesList extends Component {
    render() {
        return (
            <div className="flex-container">
                <div className="flex-item"><Link to="/b2c/marketplaces/EBay">EBay</Link></div>
                <div className="flex-item"><Link to="/b2c/marketplaces/Jet">Jet</Link></div>
                <div className="flex-item"><Link to="/b2c/marketplaces/Amazon">Amazon</Link></div>
                <div className="flex-item"><Link to="/b2c/marketplaces/Newegg">Newegg</Link></div>
                <div className="flex-item"><Link to="/b2c/marketplaces/Walmart">Walmart</Link></div>
            </div>
        );
    }
}

export default ExternalMarketplacesList;