const userSvc = require("./user.service")

class userController {
    index = async(req, res, next) =>{
        try{
            const page = +req.query.page || 1;
            const limit = +req.query.page || 15;
            const skip = (page-1)*limit;
            let filter ={};
            if(req.query.search){
                filter ={
                    name: new  RegExp(req.query.serach, 'i'),
                    eamil: new RegExp(req.query.search, 'i')
                }
            }
            if(req.query.role){
                filter={
                    ...filter,
                    role: req.query.role
                }
            }
            const data = await userSvc.listAll({
                limit: limit,
                skip: skip,
                filter: filter
            })
            const countData = await userSvc.count({
                filter: filter
            })
            res.json({
                result :data,
                message :"User List",
                meta:{
                    page: page,
                    total: countData,
                    limit : limit
                }
            })
        }catch(exception){
            next(exception)
        }
    }
}
const userCtrl = new UserController()
module.exports = userCtrl;