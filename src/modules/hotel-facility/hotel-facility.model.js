const { string, required } = require("joi")
const mongoose = require("mongoose")

const HotelFacilitySchema = new mongoose.Schema({
    facility_id: {
        type: mongoose.Types.ObjectId,
        ref:"Facility",
        required: true,
        min: 2
    },
    hotel_id: {
        type: mongoose.Types.ObjectId,
        ref: "Hotel"
    },
    isincluded: {
        type: String,
        enum: ['included', 'not included'],
        default: "not included",
        required: true
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