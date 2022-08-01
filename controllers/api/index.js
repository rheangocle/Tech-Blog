const router = require("express").Router();
const userRoutes = require('./user-routes');

router.user('/users', userRoutes);

module.exports = router;
