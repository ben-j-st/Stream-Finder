const router = require("express").Router();
const netflixController = require("../../controllers/netflixController");

// Matches with "/api/netflix"
router.route("/")
    .get(netflixController.findAll)

module.exports = router;
