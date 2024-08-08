const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const hotelCtrl = require("./hotel.controller");
const { HotelCreateDTO, HotelUpdateDTO } = require("./hotel.dto");

router.get('/home-list', hotelCtrl.listForHome);
// router.get('/type', hotelCtrl.getHotelsByType);
// router.get('/type', hotelCtrl.getHotelsByType);
router.get('/type', hotelCtrl.getHotelTypes);
router.get('/type/:type', hotelCtrl.getHotelsByType); 
router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('hotels'),
        uploader.single('image'),
        bodyValidator(HotelCreateDTO),
        hotelCtrl.create
    )
    .get(
        auth,
        allowRole(['admin', 'staff', 'customer']),
        hotelCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole(['admin', 'staff', 'customer']),
        hotelCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('hotels'),
        uploader.single('image'),
        bodyValidator(HotelUpdateDTO, ['image']),
        hotelCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        hotelCtrl.delete
    )

module.exports = router;