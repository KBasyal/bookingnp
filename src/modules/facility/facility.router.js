const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const facilityCtrl = require("./facility.controller");
const { FacilityCreateDTO, FacilityUpdateDTO } = require("./facility.dto");

router.get('/home-list', facilityCtrl.listForHome);

router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('facilitys'),
        uploader.single('image'),
        bodyValidator(FacilityCreateDTO),
        facilityCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        facilityCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        facilityCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('facilitys'),
        uploader.single('image'),
        bodyValidator(FacilityUpdateDTO),
        facilityCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        facilityCtrl.delete
    )

module.exports = router;