
// const allowRole = (allowedRole) => {
//     return (req, res, next) => {
//         try {
//             const loggedInUser = req.authUser || null;
//             console.log("the lossge in user is:",loggedInUser)
//             if (!loggedInUser) {
//                 return res.status(401).json({ message: "Please login first" });
//             }

//             const role = loggedInUser.role;
//             if ((typeof allowedRole === 'string' && allowedRole === role) ||
//                 (Array.isArray(allowedRole) && allowedRole.includes(role))) {
//                 return next();
//             } else {
//                 return res.status(403).json({ message: "You do not have privilege to access this API" });
//             }
//         } catch (exception) {
//             console.error('Error in allowRole middleware:', exception);
//             return next(exception);
//         }
//     }
// }

// module.exports = allowRole;
// rbac.middleware.js
// rbac.middleware.js
const allowRole = (allowedRole) => {
    return (req, res, next) => {
        try {
            const loggedInUser = req.authUser || null;
            console.log("Logged in user:", loggedInUser);
            if (!loggedInUser) {
                return res.status(401).json({ message: "Please login first" });
            }

            const role = loggedInUser.role;
            console.log("User role:", role);
            console.log("Allowed roles:", allowedRole);
            if ((typeof allowedRole === 'string' && allowedRole === role) ||
                (Array.isArray(allowedRole) && allowedRole.includes(role))) {
                return next();
            } else {
                return res.status(403).json({ message: "You do not have privilege to access this API" });
            }
        } catch (exception) {
            console.error('Error in allowRole middleware:', exception);
            return next(exception);
        }
    }
};

module.exports = allowRole;

