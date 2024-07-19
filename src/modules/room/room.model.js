const { ref, required } = require("joi")
const mongoose = require("mongoose")
const RoomSchema = mongoose.Schema({
    facility_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Facility",
    },
    type: {
        type: String,
        enum: ["Single Room", "Double Room", "Twin Room", "Triple Room", "Quad Room", "Queen Room", "King Room", "Studio Room", "Suite", "Junior Suite", "Presidential Suite", "Accessible Room", "Connecting Rooms", "Adjoining Rooms", "Deluxe Room", "Executive Room", "Penthouse"],
        default: "Single Room",
        required: true

    },
    price_per_night: {
        type: Number,
        required: true,
        min: 100
    },
    numberOfBed: {
        type: Number,
        required: true,
        min: 1
    },
    isBooked: {
        type: String,
        enum: ['open', 'booked'],
        default: "open",
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

const RoomModel = mongoose.model("RoomFacility", RoomSchema)
module.exports = RoomModel