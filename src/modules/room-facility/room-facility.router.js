const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const roomfacilityCtrl = require("./room-facility.controller");
const { RoomFacilityCreateDTO, RoomFacilityUpdateDTO } = require("./room-facility.dto");

router.get('/home-list', roomfacilityCtrl.listForHome);

router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('rooms'),
        uploader.single('image'),
        bodyValidator(RoomFacilityCreateDTO),
        roomfacilityCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        roomfacilityCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        roomfacilityCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('rooms'),
        uploader.single('image'),
        bodyValidator(RoomFacilityUpdateDTO),
        roomfacilityCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        roomfacilityCtrl.delete
    )

module.exports = router;