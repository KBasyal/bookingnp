const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    country_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
        required: true
    },
    city_id: {
        type: mongoose.Schema.ObjectId,
        ref: "City",
        required: true
    },
    hotel_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Hotel",
        required: true
    },
    room_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
        required: true
    },
    checkindate: {
        type: Date,
        required: true
    },
    checkoutdate: {
        type: Date,
        required: true
    },
    noofguests: {
        type: Number,
        required: true,
        min: 1
    },
    totalprice: {
        type: Number,
        required: true,
        min: 0
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        default:null
    },
    updatedBy:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        default:null
    },    
},{timestamps: true, //createdAt, updatedAt are auto created
autoCreate: true, //  create a table
autoIndex: true // indexing
});

const BookingModel = mongoose.model("Booking", BookingSchema);
model.exports=BookingModel
