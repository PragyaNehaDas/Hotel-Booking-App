const {Router} = require("express");
const { getBookings, createBooking, updateBooking, deleteBooking, getBooking } = require("../controllers/bookingController.js");
const {auth} = require("../middleware/authMiddleware.js")
const router = Router();

router.get("/", auth, getBookings)

//get single booking
router.get("/:id", getBooking)

//create booking
router.post("/", auth, createBooking)

//update booking
router.put("/:id", auth, updateBooking)

// Delete booking
router.delete("/:id", auth, deleteBooking);


module.exports = router;