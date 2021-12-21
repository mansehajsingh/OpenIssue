class Session {

    constructor(username, sessionID, expiryDate) {
        this._username = username;
        this._sessionID = sessionID;
        this._expiryDate = expiryDate;
    }

    get username() {
        return this._username;
    }

    set username(username) {
        this._username = username;
    }

    get sessionID() {
        return this._sessionID;
    }

    set sessionID(sessionID) {
        this._sessionID = sessionID;
    }

    get expiryDate() {
        return this._expiryDate;
    }

    set expiryDate(expiryDate) {
        this._expiryDate = expiryDate;
    }

}

module.exports.Session = Session;