// validates the user information, returns null if the info is valid, returns
// an object with an error message and status code otherwise
module.exports = function userInvalidity(username, first_name, last_name, password) {
    if(!username || !first_name || !password) {
        return { status: 422, message: "One or more required fields are empty." };
    }

    if (username.length < 4 || username.length > 20) {
        return { status: 422, message: "Username must be between 4-20 characters long, inclusive." };
    }

    if (!username.match(/^[a-zA-Z0-9_]+$/)) {
        return { status: 422, message: "Username must be alphanumeric with underscores." };
    }

    if (password.length < 6 || password.length > 30) {
        return { status: 422, message: "Password must be between 6-30 characters long, inclusive." };
    }

    return null;
}