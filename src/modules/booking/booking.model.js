const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
    {
        hotel_id: {
            type: mongoose.Types.ObjectId,
            ref: "Hotel",
            default: null
        },
        room_id: {
            type: mongoose.Types.ObjectId,
            ref: "Room",
            default: null
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null
        },
        roomfacility_id: {
            type: mongoose.Types.ObjectId,
            ref: "RoomFacility",
            default: null
        },
        checkin:{
            type: Date,
            required: true
        },
        checkout: {
            type: Date,
            required: true
        },
        noofguests:{
            type:String,
            required:true
        },
        total:{
            type:String,
            required:true
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null,
        },
        updatedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },{
        timestamps: true, // createdAt, updatedAt keys area auto-added
        autoCreate: true, // create the table
        autoIndex: true, // indexing
    }
)

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;