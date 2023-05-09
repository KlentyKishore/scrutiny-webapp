const router = require("express").Router();

const users = require("./users");
const question = require("./question");
const admin = require("./admin");


router.use("/user", users);
router.use("/api/admin", admin);

router.use("/", question);


module.exports = router;
