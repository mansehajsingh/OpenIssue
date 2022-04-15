const { flairs: storedFlairs } = require("../../constants");

module.exports = function issueValidity (title, content, flairs) {
    if (!title || !flairs || (!content && content !== "")) {
        return { status: 422, message: "Required fields were not received." };
    }

    if (title.length > 100) {
        return { status: 422, message: "Title cannot be longer than 100 characters."};
    }

    if (content.length > 5000) {
        return { status: 422, message: "Content cannot exceed 500 characters." };
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