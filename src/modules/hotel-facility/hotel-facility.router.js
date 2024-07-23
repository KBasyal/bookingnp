const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const hotelfacilityCtrl = require("./hotel-facility.controller")
const {HotelFacilityCreateDTO, HotelFacilityUpdateDTO} =require("./hotel-facility.dto")

router.get('/home-list', hotelfacilityCtrl.listForHome);

router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('hotels'),
        uploader.single('image'),
        bodyValidator(HotelFacilityCreateDTO),
        hotelfacilityCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        hotelfacilityCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        hotelfacilityCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('hotels'),
        uploader.single('image'),
        bodyValidator(HotelFacilityUpdateDTO, ['image']),
        hotelfacilityCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        hotelfacilityCtrl.delete
    )

module.exports = router;