const facilitySvc = require("./facility.service");

class FacilityController{
    create = async (req, res, next)=>{
        try{
            const payload = facilitySvc.transformCreateData(req);
            const createdFacility = await facilitySvc.store(payload);
            res.json({
                result:createdFacility,
                message: "facility created successfully",
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
            const data = await facilitySvc.listAll({
                limit :limit,
                skip:skip,
                filter: filter
            });
            const countData = await facilitySvc.count({
                filter : filter
            })
            res.json({
                result: data,
                message:"Facility List",
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
            const detail = await facilitySvc.findOne({
                _id: req.params.id
            })
            res.json({
                result:detail,
                message: "Facility Detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }
    update =async(req, res, next)=>{
        try{
            const existingData = await facilitySvc.findOne({
                _id: req.params.id
            })
            const payload =facilitySvc.transformUpdateData(req, existingData)
            const updateStatus = await facilitySvc.update({_id: req.params.id}, payload)
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
            const exists = await  facilitySvc.findOne({_id : req.params.id})
            const status = await facilitySvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : " Facility deleted successfuly",
                meta : null
            })

        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req, res, next) =>{
        try{
            const list = await facilitySvc.getForHome()
            res.json({
                result: list,
                message:"Facility listed successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }
    }
}
const facilityCtrl = new FacilityController()
module.exports = facilityCtrl;