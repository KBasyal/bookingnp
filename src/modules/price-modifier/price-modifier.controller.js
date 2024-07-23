const pricemodifierSvc = require("./price-modifier.service");

class PriceModifierController{
    create = async (req, res, next)=>{
        try{
            const payload = pricemodifierSvc.transformCreateData(req);
            const createdPriceModifier = await pricemodifierSvc.store(payload);
            res.json({
                result:createdPriceModifier,
                message: "pricemodifier created successfully",
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
            const data = await pricemodifierSvc.listAll({
                limit :limit,
                skip:skip,
                filter: filter
            });
            const countData = await pricemodifierSvc.count({
                filter : filter
            })
            res.json({
                result: data,
                message:"PriceModifier List",
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
            const detail = await pricemodifierSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result:detail,
                message: "PriceModifier Detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }
    update =async(req, res, next)=>{
        try{
            const existingData = await pricemodifierSvc.findOne({
                _id: req.params.id
            })
            const payload =pricemodifierSvc.transformUpdateData(req, existingData)
            const updateStatus = await pricemodifierSvc.update({_id: req.params.id}, payload)
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
            const exists = await  pricemodifierSvc.findOne({_id : req.params.id})
            const status = await pricemodifierSvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : " PriceModifier deleted successfuly",
                meta : null
            })

        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req, res, next) =>{
        try{
            const list = await pricemodifierSvc.getForHome()
            res.json({
                result: list,
                message:"PriceModifier listed successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }
    }
}
const pricemodifierCtrl = new PriceModifierController()
module.exports = pricemodifierCtrl;