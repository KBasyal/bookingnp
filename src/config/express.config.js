const express = require("express")
const path = require("path")
require("./db.config")
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const mainRouter = require('./routing.config')
const router = express.Router()
const mongoose = require("mongoose")
const Joi = require('joi')

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

app.use('/assets/image', express.static(path.join(__dirname, '../../public/uploads')));

router.get('/health', (req, res, next) => {
    res.json({
        result: "hello there",
        message: "success ok",
        meta: null
    });
});

app.use(router);

app.use(mainRouter);
app.use((request, response, next) => {
    next({ code: 404, message: "Resource not found" });
});


// Error hnadling middleware

app.use((error, req, res, next) => {
    let statusCode = error.code || 500;
    let data = error.data || null;
    let msg = error.message || "Internal Server Error";

    if (error instanceof Joi.ValidationError) {
        statusCode = 422;
        msg = "Validation Failed";
        data = {};
        const errorDetail = error.details;
        if (Array.isArray(errorDetail)) {
            errorDetail.map((errorObj) => {
                data[errorObj.context.label] = errorObj.message;
            });
        }
    }

    if (statusCode === 11000) {
        statusCode = 400;
        data = {};
        const fields = Object.keys(error.keyPattern);
        fields.map((fieldname) => {
            data[fieldname] = fieldname + " should be unique";
        });
        msg = "Validation failed";
    }

    res.status(statusCode).json({
        result: data,
        message: msg,
        meta: null
    });
});

module.exports = app;



module.exports = app;