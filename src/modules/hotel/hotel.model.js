const mongoose = require("mongoose")

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2
    },
    country:{
        type:String,
        required:true,
        min:2
    },
    city:{
        type:String,
        required:true,
        min:2
    },
    type: {
        type: String,
        enum: ["Luxury Hotel", "Boutique Hotel", "Resort Hotel", "Business Hotel", "Airport Hotel", "Extended Stay Hotel", "Bed and Breakfast", "Motel", "Inn", "Hostel", "Eco Hotel", "Apartment Hotel", "Casino Hotel", "Conference Hotel", "Family Hotel", "Historic Hotel", "Beach Hotel", "Ski Hotel"],
        default: "Motel",
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        min: 4
    },
    category_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
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

const HotelModel = mongoose.model("Hotel", HotelSchema)
module.exports = HotelModel