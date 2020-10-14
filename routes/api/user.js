const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router.route("/")
    .post(userController.create)

router.route("/login")
    .post(userController.findOne)

module.exports = router;

