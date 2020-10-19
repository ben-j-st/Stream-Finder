const router = require("express").Router();
const amazonController = require("../../controllers/amazonController");

// Matches with "/api/amazon"
router.route("/")
    .get(amazonController.findAll)

module.exports = router;
