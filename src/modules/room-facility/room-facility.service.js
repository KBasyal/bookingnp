const RoomFacilityModel = require("./room-facility.model");

class RoomFacilityService {
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
        console.log("data is:",data)
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
            const roomfacility = new RoomFacilityModel(data);
            console.log("roomfacility info", roomfacility);
            return await roomfacility.save();
        } catch (exception) {
            console.error('Error saving roomfacility:', exception);
            throw exception;
        }
    }
    
    count = async ({filter}) => {
        try {
            const countData = await RoomFacilityModel.countDocuments(filter);
            return countData;

        } catch (exception) {
            throw exception
        }
    }
    listAll = async ({ limit, skip, filter = {} }) => {
        try {
            const response = await RoomFacilityModel.find(filter)
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
            const data = await RoomFacilityModel.findOne(filter);
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
            const updateResponse = await RoomFacilityModel.findOneAndUpdate(filter, {$set: data})
            return updateResponse

        }catch(exception){
            throw exception;
        }
    }
    deleteOne = async(filter) =>{
        try{
            const response = await RoomFacilityModel.findOneAndDelete(filter)
            if(!response){
                throw { code: 404, message:" RoomFacility does not exists"}
            }
            return response

        }catch(exception){
            throw exception
        }
    }

    getForHome =async ()=>{
        try{
            const data = await RoomFacilityModel.find({
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
const roomfacilitySvc = new RoomFacilityService()
module.exports = roomfacilitySvc;