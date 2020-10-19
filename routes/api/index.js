const router = require("express").Router();
const netflixRoutes = require("./netflix");
const adminRoutes = require("./admin");
const userRoutes = require("./user");
const amazonRouter = require("./amazon");
const searchRoutes = require("./search");

// Book routes
router.use("/netflix", netflixRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/amazon", amazonRouter);
router.use("/search", searchRoutes);


module.exports = router;
