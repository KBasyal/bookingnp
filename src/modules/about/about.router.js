const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const aboutCtrl = require("./about.controller");
const { AboutCreateDTO, AboutUpdateDTO } = require("./about.dto");

router.get('/', aboutCtrl.listForHome);

router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('abouts'),
        uploader.single('image'),
        bodyValidator(AboutCreateDTO),
        aboutCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        aboutCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        aboutCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('abouts'),
        uploader.single('image'),
        bodyValidator(AboutUpdateDTO, ['image']),
        aboutCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        aboutCtrl.delete
    )

module.exports = router;