const mongoose = require("mongoose")

const RoomFacliltySchema = mongoose.Schema({
    facility_id: {
        type: mongoose.Schema.ObjectId,
        ref:'Facility',
        required: true,
        min: 2
    },
    room_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Room"
    },
    isinclluded: {
        type: Boolean,
        required: true,
        default: false
    },
    priceImpact: {
        type: Number, // Positive or negative impact on price
        default: 0,
        required
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
const RoomFacliltyModel = mongoose.model("RoomFacility", RoomFacliltySchema)
module.exports = RoomFacliltyModel

