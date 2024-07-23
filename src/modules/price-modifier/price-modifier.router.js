const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const pricemodifierCtrl = require("./price-modifier.controller");
const { PriceModifierCreateDTO, PriceModifierUpdateDTO } = require("./price-modifier.dto");

router.get('/home-list', pricemodifierCtrl.listForHome);

router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('pricemodifiers'),
        uploader.single('image'),
        bodyValidator(PriceModifierCreateDTO),
        pricemodifierCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        pricemodifierCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        pricemodifierCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('pricemodifiers'),
        uploader.single('image'),
        bodyValidator(PriceModifierUpdateDTO),
        pricemodifierCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        pricemodifierCtrl.delete
    )

module.exports = router;