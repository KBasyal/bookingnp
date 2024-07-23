const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
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
    numberofBed: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        required: true,
    },
    isBooked: {
        type: String,
        enum: ['open', 'booked'],
        default: "open",
    },
    facility_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Facility",
        default:null
    },
    hotel_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Hotel",
        default:null

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
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

const RoomModel = mongoose.model("Room", RoomSchema);
module.exports = RoomModel;
