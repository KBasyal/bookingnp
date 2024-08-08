// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const authSvc = require("../modules/auth/auth.service");

// const auth = async (req, res, next) => {
//     try {
      
//         let token = req.headers["authorization"] || null;
//         if (!token) {
//             return next({ code: 401, message: "Token/Access Code required" });
//         }

       
//         token = token.split(" ").pop();

//         let tokenData;
//         try {
//             tokenData = jwt.verify(token, process.env.JWT_SECRET);
//         } catch (err) {
//             return next({ code: 401, message: "Invalid token" });
//         }

//         console.log(tokenData);

//         const userDetail = await authSvc.findOneUser({ _id: tokenData.sub });
//         console.log(userDetail);
//         if (!userDetail) {
//             return next({ code: 401, message: "User does not exist anymore" });
//         }


//         req.authUser = userDetail;
//         next(); 
//     } catch (exception) {
//         console.log("exception", exception);
//         next({ code: 401, message: "Unauthorized access" });
//     }
// };

// module.exports = auth;

// auth.middleware.js
require("dotenv").config();
const jwt = require("jsonwebtoken");
const authSvc = require("../modules/auth/auth.service");

const auth = async (req, res, next) => {
    try {
        let token = req.headers["authorization"] || null;
        if (!token) {
            return next({ code: 401, message: "Token/Access Code required" });
        }

        token = token.split(" ").pop();

        let tokenData;
        try {
            tokenData = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return next({ code: 401, message: "Invalid token" });
        }

        console.log("Token data:", tokenData);

        const userDetail = await authSvc.findOneUser({ _id: tokenData.sub });
        console.log("User detail:", userDetail);
        if (!userDetail) {
            return next({ code: 401, message: "User does not exist anymore" });
        }

        req.authUser = userDetail;
        next();
    } catch (exception) {
        console.log("Exception:", exception);
        next({ code: 401, message: "Unauthorized access" });
    }
};

module.exports = auth;

