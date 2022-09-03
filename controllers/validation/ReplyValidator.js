module.exports = function replyValidity (content) {
    if (!content)
        return { status: 422, message: "Required fields were not recieved." };
    if (content.length < 4)
        return { status: 422, message: "Content must be at least 4 characters." };
    if (content.length > 5000)
        return { status: 422, message: "Content must be less than 5000 characters." };
    
    return null;
}