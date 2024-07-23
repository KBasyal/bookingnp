const hotelSvc = require("./hotel-facility.service");

class HotelFacilityController{
    create = async (req, res, next)=>{
        try{
            const payload = hotelSvc.transformCreateData(req);
            const createdHotelFacility = await hotelSvc.store(payload);
            console.log("created hotel facility :",createdHotelFacility)
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
            const data = await hotelSvc.listAll({
                limit :limit,
                skip:skip,
                filter: filter
            });
            const countData = await hotelSvc.count({
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
            const detail = await hotelSvc.findOne({
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
            const existingData = await hotelSvc.findOne({
                _id: req.params.id
            })
            const payload =hotelSvc.transformUpdateData(req, existingData)
            const updateStatus = await hotelSvc.update({_id: req.params.id}, payload)
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
            const exists = await  hotelSvc.findOne({_id : req.params.id})
            const status = await hotelSvc.deleteOne({_id : req.params.id});
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
            const list = await hotelSvc.getForHome()
            res.json({
                result: list,
                message:"Hotel Facility listed successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }
    }
}
const hotelfacilityCtrl = new HotelFacilityController()
module.exports = hotelfacilityCtrl;