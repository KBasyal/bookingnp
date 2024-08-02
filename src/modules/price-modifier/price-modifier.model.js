const mongoose = require("mongoose");

const PriceModifierSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["Seasonal", "Discount", "Service Charge", "Other"],
        required: true
    },
    percentage: {
        type: Number,
        default:null
    },
    applicableFrom: {
        type: Date,
        required: true
    },
    applicableTo: {
        type: Date,
        required: true
    },
    hotel_id:{
        type:mongoose.Types.ObjectId,
        ref:"Hotel",
        default:null

    },
    room_id:{
        type:mongoose.Types.ObjectId,
        ref:"Room",
        deault:null

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
});

const PriceModifierModel = mongoose.model("PriceModifier",PriceModifierSchema)
module.exports =PriceModifierModel

