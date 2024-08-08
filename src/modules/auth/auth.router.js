const authRoute = require('express').Router();
const {bodyValidator}= require("../../middleware/validator.middleware")
const authCtrl = require("./auth.controller")
const auth = require("../../middleware/auth.middleware")
const allowRole = require("../../middleware/rbac.middleware")
const {registerDTO, loginDTO}= require("./auth.dto")

const {setPath, uploader} = require("../../middleware/uploader.middleware");

authRoute.post('/register', setPath('users'),uploader.single('image'), bodyValidator(registerDTO), authCtrl.register)
authRoute.get("/activate/:token", authCtrl.activate)

authRoute.post('/login',bodyValidator(loginDTO), authCtrl.login)
authRoute.get('/me', auth, authCtrl.getLoggedIn)
authRoute.get("/admin", auth, allowRole('admin'), authCtrl.adminAccess)
authRoute.post('/logout', (req, res) => {
    // This route could have some server-side logic if needed, e.g., invalidating sessions
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = authRoute;