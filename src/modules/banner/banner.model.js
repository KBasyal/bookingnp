const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      min: 2,
    },
    link: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    image: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true, // createdAt, updatedAt keys area auto-added
    autoCreate: true, // create the table
    autoIndex: true, // indexing
  }
);

const BannerModel = mongoose.model("Banner", BannerSchema);

module.exports = BannerModel;