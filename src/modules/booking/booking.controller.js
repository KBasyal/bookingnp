const bookingSvc = require("./booking.service");

class BookingController{
    create = async (req, res, next)=>{
        try{
            const payload = bookingSvc.transformCreateData(req);
            const createdBooking = await bookingSvc.store(payload);
            res.json({
                result:createdBooking,
                message: "booking created successfully",
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
            const data = await bookingSvc.listAll({
                limit :limit,
                skip:skip,
                filter: filter
            });
            const countData = await bookingSvc.count({
                filter : filter
            })
            res.json({
                result: data,
                message:"Booking List",
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
            const detail = await bookingSvc.findOne({
                _id: req.params.id
            })
            res.json({
                result:detail,
                message: "Booking Detail fetched",
                meta: null
            })

        }catch(exception){
            next(exception)
        }
    }
    update =async(req, res, next)=>{
        try{
            const existingData = await bookingSvc.findOne({
                _id: req.params.id
            })
            const payload =bookingSvc.transformUpdateData(req, existingData)
            const updateStatus = await bookingSvc.update({_id: req.params.id}, payload)
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
            const exists = await  bookingSvc.findOne({_id : req.params.id})
            const status = await bookingSvc.deleteOne({_id : req.params.id});
            res.json({
                result : status,
                message : " Booking deleted successfuly",
                meta : null
            })

        }catch(exception){
            next(exception)
        }
    }
    listForHome = async(req, res, next) =>{
        try{
            const list = await bookingSvc.getForHome()
            res.json({
                result: list,
                message:"Booking listed successfully",
                meta: null
            })

        }catch(exception){
            next(exception)

        }
    }
}
const bookingCtrl = new BookingController()
module.exports = bookingCtrl;