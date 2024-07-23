const hotelfacilityfacilitySvc = require("./hotel-facility.service");

class HotelFacilityController{
    create = async (req, res, next)=>{
        try{
            const payload = hotelfacilitySvc.transformCreateData(req);
            const createdHotelFacility = await hotelfacilitySvc.store(payload);
            res.json({
                result:createdHotelFacility,
                message: "hotelfacility created successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }

    }
    index = async(req, res, next)=>{
        try{
          
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 15;

            const skip = (page - 1)*limit;
            let filter = {};
            if(req.query.search){
               
                filter = {
                    title: new RegExp(req.query.search, 'i')
                }
            }
            const data = await hotelfacilitySvc.listAll({
                limit :limit,
                skip:skip,
                filter: filter
            });
            const countData = await hotelfacilitySvc.count({
                filter : filter
            })
            res.json({
                result: data,
                message:"HotelFacility List",
                meta:{
                    limit: limit,
                    page: page,
                    total :countData
                }
            })

        }catch(exception){
            next(exception)
        }
    }
    show= async(req, res , next) =>{
        try{
            const detail = await hotelfacilitySvc.findOne({
                _id: req.params.id
            })
            res.json({
                result:detail,
                message: "HotelFacility Detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }
    update =async(req, res, next)=>{
        try{
            const existingData = await hotelfacilitySvc.findOne({
                _id: req.params.id
            })
            const payload =hotelfacilitySvc.transformUpdateData(req, existingData)
            const updateStatus = await hotelfacilitySvc.update({_id: req.params.id}, payload)
            res.json({
                result: updateStatus,
                messsage:"Data updated",
                meta : null
                
            })

        }catch(exception){
            next(exception)
        }

    }
    delete= async(req, res, next)=>{
        try{
            const exists = await  hotelfacilitySvc.findOne({_id : req.params.id})
            const status = await hotelfacilitySvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : " HotelFacility deleted successfuly",
                meta : null
            })

        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req, res, next) =>{
        try{
            const list = await hotelfacilitySvc.getForHome()
            res.json({
                result: list,
                message:"HotelFacility listed successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }
    }
}
const hotelfacilityCtrl = new HotelFacilityController()
module.exports = hotelfacilityCtrl;