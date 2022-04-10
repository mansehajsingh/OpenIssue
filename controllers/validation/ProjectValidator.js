module.exports = function projectInvalidity(name, description) {

    if (!name || (!description && description !== "")) {
        return { status: 422, message: "Name and/or description not provided." }
    }

    if (name.length > 35 || name.length == 0) {
        return { status: 422, message: "Name cannot be empty or exceed 35 characters in length." };
    }

    if (description.length > 150) {
        return { status: 422, message: "Description cannot exceed 150 characters." };
    }

    return null;
}