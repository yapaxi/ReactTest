import 'whatwg-fetch'

class RMAService {

    static getPendingReturns(marketplaceId) {
        return fetch("http://localhost:51231/api/returns/pending/" + (marketplaceId || ""))
               .then(e => e.json());
    }

    static getReturns() {
        return fetch("http://localhost:51231/api/returns/pending/")
            .then(e => e.json())
            .catch((ex) => console.log('parsing failed', ex));
    } 

    static getReturn(returnId) {
        return fetch("http://localhost:51231/api/returns/" + returnId)
            .then(e => e.json());
    }
    
    static invokeAction(returnId, action) {
        return fetch("http://localhost:51231/api/returns/" + returnId, {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
               action: action
           })
        });
    }
}

export default RMAService