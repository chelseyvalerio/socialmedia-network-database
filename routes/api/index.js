const router = require("express").Router();
const userRoutes = require("./user-routes");
const throughRoutes = require("./thought-routes");

router.use("/user", userRoutes);
router.use("/thoughts", throughRoutes);

module.exports = router;
