const aboutSvc = require("./about.service");

class AboutController{
    create = async (req, res, next)=>{
        try{
            const payload = aboutSvc.transformCreateData(req);
            const createdAbout = await aboutSvc.store(payload);
            res.json({
                result:createdAbout,
                message: "about created successfully",
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
            const data = await aboutSvc.listAll({
                limit :limit,
                skip:skip,
                filter: filter
            });
            const countData = await aboutSvc.count({
                filter : filter
            })
            res.json({
                result: data,
                message:"About List",
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
            const detail = await aboutSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result:detail,
                message: "About Detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }
    update =async(req, res, next)=>{
        try{
            const existingData = await aboutSvc.findOne({
                _id: req.params.id
            })
            const payload =aboutSvc.transformUpdateData(req, existingData)
            const updateStatus = await aboutSvc.update({_id: req.params.id}, payload)
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
            const exists = await  aboutSvc.findOne({_id : req.params.id})
            const status = await aboutSvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : " About deleted successfuly",
                meta : null
            })

        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req, res, next) =>{
        try{
            const list = await aboutSvc.getForHome()
            res.json({
                result: list,
                message:"About listed successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }
    }
}
const aboutCtrl = new AboutController()
module.exports = aboutCtrl;