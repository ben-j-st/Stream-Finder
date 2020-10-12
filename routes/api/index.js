const router = require("express").Router();
const netflixRoutes = require("./netflix");
const adminRoutes = require("./admin");

// Book routes
router.use("/netflix", netflixRoutes);
router.use("/admin", adminRoutes);


module.exports = router;
