const router = require("express").Router();
const netflixRoutes = require("./netflix");
const adminRoutes = require("./admin");
const userRoutes = require("./user");

// Book routes
router.use("/netflix", netflixRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);


module.exports = router;
