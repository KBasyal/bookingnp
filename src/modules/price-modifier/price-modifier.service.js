const PriceModifierModel = require("./price-modifier.model");

class PriceModifierService {
    transformCreateData = (req) => {
        const data = {
            ...req.body
        }
        // if (!req.file) {
        //     throw { code: 400, message: "Image is required" }
        // } else {
        //     data.image = req.file.filename;
        // }
        data.createBy = req.authUser._id;
        return data;
    }
    transformUpdateData = (req, existingData) => {
        const data = {
            ...req.body
        }
        // if (req.file) {
        //     data.image = req.file.filename;
        // } else {
        //     data.image = existingData.image
            
        // }
        data.updatedBy = req.authUser._id;
        return data;

    }
    store = async (data) => {
        try {
            const pricemodifier = new PriceModifierModel(data);
            return await pricemodifier.save()
        } catch (exception) {
            (exception)
        }
    }
    count = async ({filter}) => {
        try {
            const countData = await PriceModifierModel.countDocuments(filter);
            return countData;

        } catch (exception) {
            throw exception
        }
    }
    listAll = async ({ limit, skip, filter = {} }) => {
        try {
            const response = await PriceModifierModel.find(filter)
                .sort({ _id: "desc" })
                .skip(skip)
                .limit(limit)
            return response;
        } catch (exception) {
            throw (exception);
        }
    }
    findOne = async(filter)=>{
        try{
            const data = await PriceModifierModel.findOne(filter);
            if(!data){
                throw{code: 400, message: "Data not found"}
            }
            return data;

        }catch(exception){
            throw exception
        }
    }
    update = async(filter, data) =>{
        try{
            const updateResponse = await PriceModifierModel.findOneAndUpdate(filter, {$set: data})
            return updateResponse

        }catch(exception){
            throw exception;
        }
    }
    deleteOne = async(filter) =>{
        try{
            const response = await PriceModifierModel.findOneAndDelete(filter)
            if(!response){
                throw { code: 404, message:" PriceModifier does not exists"}
            }
            return response

        }catch(exception){
            throw exception
        }
    }

    getForHome =async ()=>{
        try{
            const data = await PriceModifierModel.find({
                status : "active"
            })
            .sort({_id:"desc"})
            .limit(10)
            return data

        }catch(exception){
            throw exception;
        }
    }
}
const pricemodifierSvc = new PriceModifierService()
module.exports = pricemodifierSvc;