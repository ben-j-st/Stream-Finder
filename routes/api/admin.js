const router = require("express").Router();
const adminController = require("../../controllers/adminController")

// Matches with "/api/admin"
router.route("/netflix")
    .get(adminController.saveNetflix);

router.route("/amazon")
    .get(adminController.saveAmazon);

router.route("/update/amazon")
    .get(adminController.updateAmazon);

router.route("/test")
    .post(adminController.testSearch);

module.exports = router;
