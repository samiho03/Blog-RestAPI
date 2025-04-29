const validateEmail = (email) => {
    const result = email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    return result
}

module.exports = validateEmail;