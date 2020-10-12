const router = require("express").Router();
const adminController = require("../../controllers/adminController")

// Matches with "/api/admin"
router.route("/")
  .get(adminController.saveNetflix);


module.exports = router;
