const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const bookingCtrl = require("./booking.controller");
const { BookingCreateDTO, BookingUpdateDTO } = require("./booking.dto");

router.get('/home-list', bookingCtrl.listForHome);

router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('bookings'),
        uploader.single('image'),
        bodyValidator(BookingCreateDTO),
        bookingCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        bookingCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        bookingCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('bookings'),
        uploader.single('image'),
        bodyValidator(BookingUpdateDTO, ['image']),
        bookingCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        bookingCtrl.delete
    )

module.exports = router;