const { flairs: storedFlairs } = require("../../constants");

module.exports = function issueValidity (title, content, flairs, priority) {
    if (!title || !flairs || (!content && content !== "") || !priority) {
        return { status: 422, message: "Required fields were not received." };
    }

    if (title.length > 100) {
        return { status: 422, message: "Title cannot be longer than 100 characters."};
    }

    if (content.length > 5000) {
        return { status: 422, message: "Content cannot exceed 5000 characters." };
    }

    const priorities = { "low": 1, "medium": 1, "high": 1, "critical": 1 };

    if (!priorities[priority]) {
        return { status: 422, message: "Priority does not fit existing possibilities." };
    }

    let flairsAreValid = true;
    const alreadyUsedFlairs = {};

    flairs.forEach(flair => {
        if (storedFlairs.indexOf(flair) === -1) flairsAreValid = false;
        if (alreadyUsedFlairs[flair]) flairsAreValid = false;
        alreadyUsedFlairs[flair] = true;
    });

    if (!flairsAreValid) {
        return { status: 422, message: "Invalid flair(s)." };
    }

    return null;
} 