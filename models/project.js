class Project {

    constructor(projectName, projectDescription, projectOwner) {
        this._projectName = projectName;
        this._projectDescription = projectDescription;
        this._projectOwner = projectOwner;
    }

    get projectName() {
        return this._projectName;
    }

    get projectDescription() {
        return this._projectDescription;
    }

    get projectOwner() {
        return this._projectOwner;
    }

    set projectName(projectName) {
        this._projectName = projectName;
    }

    set projectDescription(projectDescription) {
        this._projectDescription = projectDescription;
    }

    set projectOwner(projectOwner) {
        this._projectOwner = projectOwner;
    }

}

module.exports.Project = Project;