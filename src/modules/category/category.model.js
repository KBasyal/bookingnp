const mongoose = require("mongoose")

const CategorySchema = new  mongoose.Schema({
    category:{
        type:String,
        required:true,
        min: 2,
    },
    description:{
        type: String,
        required: true,
        min:2
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

})

const CategoryModel = mongoose.model("Category", CategorySchema)

module.exports = CategoryModel