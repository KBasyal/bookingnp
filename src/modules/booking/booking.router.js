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
        allowRole(['admin', 'staff', 'customer']),
        setPath('bookings'),
        bodyValidator(BookingCreateDTO),
        bookingCtrl.create
    )
    .get(
        auth,
        allowRole(['admin', 'staff', 'customer']),
        bookingCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole(['admin', 'staff', 'customer']),
        bookingCtrl.show
    )
    .put(
        auth, 
        allowRole(['admin', 'staff', 'customer']),
        setPath('bookings'),
        uploader.single('image'),
        bodyValidator(BookingUpdateDTO, ['image']),
        bookingCtrl.update
    )
    .delete(
        auth,
        allowRole('admin', 'staff', 'customer'),
        bookingCtrl.delete
    )

module.exports = router;