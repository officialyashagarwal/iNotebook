const jwt = require('jsonwebtoken');
const JWT_Secret = "PrashantisaGood$boy";

const fetchUser = (req, res, next) => {

    // GET the User from the jwtToken and add id to the req object.

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token1" });
    }

    try {
        const data = jwt.verify(token, JWT_Secret);
        // console.log(data);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token2" });
    }
}


module.exports = fetchUser;