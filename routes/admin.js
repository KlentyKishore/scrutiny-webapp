const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth.js");

const adminController = require("../controllers/adminController.js");


//admin 
router.get("/users/",
			Auth.isAuthenticatedUser(),
			// Auth.isAdmin(),
			adminController.getAllUsers);

router.post("/updateUserRole/",
			Auth.isAuthenticatedUser(),
			// Auth.isAdmin(),
			adminController.updateUserRole);

router.get("/getAllAccessList/",
			Auth.isAuthenticatedUser(),
			// Auth.isAdmin(),
			adminController.getAllAccessList);
            
router.post("/giveAccess/",
			Auth.isAuthenticatedUser(),
			// Auth.isAdmin(),
			adminController.giveAccess);


router.post("/revokeAccess/",
			Auth.isAuthenticatedUser(),
			// Auth.isAdmin(),
			adminController.revokeAccess);


router.post("/deleteAccess/",
			Auth.isAuthenticatedUser(),
			// Auth.isAdmin(),
			adminController.deleteAccess);
module.exports = router;
