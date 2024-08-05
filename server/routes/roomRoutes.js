const {Router} = require("express")
const {getRooms, createRoom, getRoom, updateRoom, deleteRoom} = require("../controllers/roomController.js")
const {auth} = require("../middleware/authMiddleware.js")
const router = Router();

router.get("/", getRooms);

//create room
router.post("/", auth, createRoom)

//get single room
router.get("/:id", getRoom)

//update room
router.put("/:id", auth, updateRoom)

//delete room
router.delete("/:id", auth, deleteRoom)

module.exports = router;