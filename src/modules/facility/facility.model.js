const mongoose = require("mongoose")

const FacilitySchema = mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 50,
        required: true
    },
    description: {
        type: String,
        min: 2,
        max: 300,
        required: true
    },
    adonprice: {
        type: Number,
        min: 1,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
}, {
    timestamps: true, //createdAt, updatedAt are auto created
    autoCreate: true, //  create a table
    autoIndex: true // indexing

})
const FacilityModel = mongoose.model("Facility", FacilitySchema)
module.exports = FacilityModel