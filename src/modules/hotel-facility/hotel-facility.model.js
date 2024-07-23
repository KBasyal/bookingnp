const { string } = require("joi")
const mongoose = require("mongoose")

const HotelFacilitySchema = new mongoose.Schema({
    facility_id: {
        type: mongoose.Schema.ObjectId,
        ref:"Facility",
        required: true,
        min: 2
    },
    hotel_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Hotel"
    },
    isincluded: {
        type: Boolean,
        required: true,
        default: false
    },
    priceImpact: {
        type: Number, // Positive or negative impact on price
        default: 0,
        required:true
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

const HotelFacilityModel = mongoose.model("HotelFacility", HotelFacilitySchema)

module.exports = HotelFacilityModel