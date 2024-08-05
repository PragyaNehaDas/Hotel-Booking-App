const {Router} = require("express");
const { getUsers, createUser, loginUser, logoutUser } = require("../controllers/userController.js");
const {auth} = require("../middleware/authMiddleware.js")
const router = Router();

router.get("/", auth, getUsers)

//create users
router.post("/", createUser)

//user login
router.post("/login", loginUser)

//user logout
router.get("/logout", logoutUser)

module.exports = router;