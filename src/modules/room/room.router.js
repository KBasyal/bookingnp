const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const roomCtrl = require("./room.controller");
const { RoomCreateDTO, RoomUpdateDTO } = require("./room.dto");

router.get('/home-list', roomCtrl.listForHome);

router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('rooms'),
        uploader.single('image'),
        bodyValidator(RoomCreateDTO),
        roomCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        roomCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        roomCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('rooms'),
        uploader.single('image'),
        bodyValidator(RoomUpdateDTO),
        roomCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        roomCtrl.delete
    )

module.exports = router;