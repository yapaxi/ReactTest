import 'whatwg-fetch'

class RMAService {

    static getClaims() {
        return fetch("http://localhost:55147/claims")
               .then(e => e.json());
    }

    static getClaimLines(claimId) {
        return fetch(`http://localhost:55147/claims/${claimId}/claimLines`)
            .then(e => e.json());
    }
}

export default RMAService