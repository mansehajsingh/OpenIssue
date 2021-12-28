class Issue {

    constructor(title, description, projectName, creator, owner, dateCreated, type, issueID, priority) {
        this._title = title;
        this._description = description;
        this._projectName = projectName;
        this._creator = creator;
        this._owner = owner;
        this._dateCreated = dateCreated;
        this._type = type;
        this._issueID = issueID;
        this._priority = priority;
    }

    get title() { return this._title; }
    get description() { return this._description; }
    get projectName() { return this._projectName; }
    get creator() { return this._creator; }
    get owner() { return this._owner; }
    get dateCreated() { return this._dateCreated; }
    get type() { return this._type; }
    get issueID() { return this._issueID; }
    get priority() { return this._priority; }

    set title(title) {
        this._title = title;
    }

    set description(description) {
        this._description = description;
    }

    set projectName(projectName) {
        this._projectName = projectName;
    }

    set creator(creator) {
        this._creator = creator;
    }

    set owner(owner) {
        this._owner = owner;
    }

    set dateCreated(dateCreated) {
        this._dateCreated = dateCreated;
    }

    set type(type) {
        this._type = type;
    }

    set issueID(issueID) {
        this._issueID = issueID;
    }

    set priority(priority) {
        this._priority = priority;
    }

}

module.exports.Issue = Issue;