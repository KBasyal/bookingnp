const userRoutes = require('express').Router()
const auth = require("../../middleware/rbac.middleware")
const allowRole = require("../../middleware/rbac.middleware")
const userCtrl = require('./user.controller')
const userSvc = require('./user.service')

userRoutes.route('/')
    .get(auth,allowRole(['admin']), userCtrl.index)
module.exports =userRoutes