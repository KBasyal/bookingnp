
const HotelFacilityModel = require('./hotel-facility.model')

class HotelFacilityService {
    transformCreateData = (req) => {
        const data = {
            ...req.body
        }
        if (!req.file) {
            throw { code: 400, message: "Image is required" }
        } else {
            data.image = req.file.filename;
        }
        data.createBy = req.authUser._id;
        return data;
    }
    transformUpdateData = (req, existingData) => {
        const data = {
            ...req.body
        }
        if (req.file) {
            data.image = req.file.filename;
        } else {
            data.image = existingData.image
            
        }
        data.updatedBy = req.authUser._id;
        return data;

    }
    store = async (data) => {
        try {
            const hotel = new HotelFacilityModel(data);
            return await hotel.save()
        } catch (exception) {
            (exception)
        }
    }
    count = async ({filter}) => {
        try {
            const countData = await HotelFacilityModel.countDocuments(filter);
            return countData;

        } catch (exception) {
            throw exception
        }
    }
    listAll = async ({ limit, skip, filter = {} }) => {
        try {
            const response = await HotelFacilityModel.find(filter)
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
            const data = await HotelFacilityModel.findOne(filter);
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
            const updateResponse = await HotelFacilityModel.findOneAndUpdate(filter, {$set: data})
            return updateResponse

        }catch(exception){
            throw exception;
        }
    }
    deleteOne = async(filter) =>{
        try{
            const response = await HotelFacilityModel.findOneAndDelete(filter)
            if(!response){
                throw { code: 404, message:" Hotel does not exists"}
            }
            return response

        }catch(exception){
            throw exception
        }
    }

    getForHome =async ()=>{
        try{
            const data = await HotelFacilityModel.find({
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
const hotelfacilitySvc = new HotelFacilityService()
module.exports = hotelfacilitySvc;