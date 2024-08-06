const userSvc = require("./user.service")

class userController {
    index = async (req, res, next) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 15; // Fix limit calculation
            const skip = (page - 1) * limit;
            let filter = {};

            if (req.query.search) {
                filter = {
                    $or: [
                        { name: new RegExp(req.query.search, 'i') },
                        { email: new RegExp(req.query.search, 'i') }
                    ]
                };
            }

            if (req.query.role) {
                filter = {
                    ...filter,
                    role: req.query.role
                };
            }

            const data = await userSvc.listAll({
                limit: limit,
                skip: skip,
                filter: filter
            });
            const countData = await userSvc.count(filter); // Pass filter directly

            res.json({
                result: data,
                message: "User List",
                meta: {
                    page: page,
                    total: countData,
                    limit: limit
                }
            });
        } catch (exception) {
            next(exception);
        }
    }

}
const userCtrl = new userController()
module.exports = userCtrl;