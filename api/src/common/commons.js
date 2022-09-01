const queryToLowerCase = (req) => {
    for (var key in req.query) {
        req.query[key.toLowerCase()] = req.query[key];
    }

    return req;
}

module.exports = {
    queryToLowerCase
}