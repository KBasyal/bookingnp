require("dotenv").config();
const jwt = require("jsonwebtoken");
const authSvc = require("../modules/auth/auth.service");

const auth = async (req, res, next) => {
    try {
        // Extract token from the authorization header
        let token = req.headers["authorization"] || null;
        if (!token) {
            return next({ code: 401, message: "Token/Access Code required" });
        }

        // Split the token from the Bearer scheme
        token = token.split(" ").pop();

        // Verify the token (signature, expiry, formatting)
        let tokenData;
        try {
            tokenData = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return next({ code: 401, message: "Invalid token" });
        }

        console.log(tokenData);

        // Find the user associated with the token
        const userDetail = await authSvc.findOneUser({ _id: tokenData.sub });
        console.log(userDetail);
        if (!userDetail) {
            return next({ code: 401, message: "User does not exist anymore" });
        }

        // Attach the user to the request object and proceed
        req.authUser = userDetail;
        next(); // Allow the access
    } catch (exception) {
        console.log("exception", exception);
        next({ code: 401, message: "Unauthorized access" });
    }
};

module.exports = auth;
