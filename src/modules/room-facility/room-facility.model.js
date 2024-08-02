const mongoose = require("mongoose")

const RoomFacliltySchema = mongoose.Schema({
    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    facility_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Facility',
        required: true,
        default: null
    },
    room_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
        required: true,
        default: null
    },
    isinclluded: {
        type: Boolean,
        required: true,
        default: false
    },
    priceImpact: {
        type: Number, // Positive or negative impact on price
        default: 0,
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
const RoomFacliltyModel = mongoose.model("RoomFacility", RoomFacliltySchema)
module.exports = RoomFacliltyModel

