import "dotenv/config";
import { sign, decode, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

const expiration = "2h";
module.exports = {
    authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
        token = token.split(" ").pop().trim();
    }
    if (!token) {
        return req;
    }
    try {const { data } = verify(token, secret, { maxAge: expiration });
        req.user = data;
    } catch {
        console.log("Invalid token");
    }
    return req;
},
signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return sign({ data: payload }, secret, { expiresIn: expiration });
}
};