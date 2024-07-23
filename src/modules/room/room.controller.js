const roomSvc = require("./room.service");

class RoomController{
    create = async (req, res, next)=>{
        try{
            const payload = roomSvc.transformCreateData(req);
            const createdRoom = await roomSvc.store(payload);
            console.log("created room :",createdRoom)
            res.json({
                result:createdRoom,
                message: "room created successfully",
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
            const data = await roomSvc.listAll({
                limit :limit,
                skip:skip,
                filter: filter
            });
            const countData = await roomSvc.count({
                filter : filter
            })
            res.json({
                result: data,
                message:"Room List",
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
            const detail = await roomSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result:detail,
                message: "Room Detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }
    update =async(req, res, next)=>{
        try{
            const existingData = await roomSvc.findOne({
                _id: req.params.id
            })
            const payload =roomSvc.transformUpdateData(req, existingData)
            const updateStatus = await roomSvc.update({_id: req.params.id}, payload)
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
            const exists = await  roomSvc.findOne({_id : req.params.id})
            const status = await roomSvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : " Room deleted successfuly",
                meta : null
            })

        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req, res, next) =>{
        try{
            const list = await roomSvc.getForHome()
            res.json({
                result: list,
                message:"Room listed successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }
    }
}
const roomCtrl = new RoomController()
module.exports = roomCtrl;