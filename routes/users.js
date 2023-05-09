const express = require("express");
const router = express.Router();

//controller
const userController = require("../controllers/userController.js");

//middleware
const Auth = require("../middleware/auth.js");
const checkMailVerified = require("../middleware/checkMailVerified.js");

//user routes
router.post("/signin",
			userController.signIn);

router.post("/signup",
			userController.signUp);

router.get("/verifiyMyEmail/:userId",
			userController.verifiyMyEmail);

router.get("/getMyProfile",
			Auth.isAuthenticatedUser(),
			userController.getMyProfile);

router.post("/updateMyProfile",
			Auth.isAuthenticatedUser(),
			userController.updateMyProfile);

router.post("/forgetMyPassword",
			userController.forgetMyPassword);

router.post("/resetMyPassword",
			userController.resetMyPassword);

//user question routes

// get question based on sub folder id
router.get("/getQuestions/:subFolderID",
			Auth.isAuthenticatedUser(),
			userController.getQuestions);

router.get("/getMyQuestions",
			Auth.isAuthenticatedUser(),
			userController.getMyQuestions);

router.get("/getMySortedQuestions",
			Auth.isAuthenticatedUser(),
			userController.getMySortedQuestions);

router.get("/getMyQuestion/:questionId",
			Auth.isAuthenticatedUser(),
			userController.getMyQuestion);

router.get("/likeMyQuestion/:questionId",
			Auth.isAuthenticatedUser(),
			userController.likeMyQuestion);

router.post("/addMyQuestion",
			Auth.isAuthenticatedUser(),
			userController.addMyQuestion);

router.post("/updateMyQuestion",
			Auth.isAuthenticatedUser(),
			userController.updateMyQuestion);

router.get("/deleteMyQuestion/:questionId/",
			Auth.isAuthenticatedUser(),
			userController.deleteMyQuestion);

//user answer routes
router.get("/getMyAnswers",
			Auth.isAuthenticatedUser(),
			userController.getMyAnswers);

router.get("/getMyAnswer/:answerId",
			Auth.isAuthenticatedUser(),
			userController.getMyAnswer);

router.get("/likeMyAnswer/:answerId",
			Auth.isAuthenticatedUser(),
			checkMailVerified,
			userController.likeMyAnswer);

router.post("/addMyAnswer",
			Auth.isAuthenticatedUser(),
			checkMailVerified,
			userController.addMyAnswer);

router.post("/updateMyAnswer",
			Auth.isAuthenticatedUser(),
			userController.updateMyAnswer);

router.get("/deleteMyAnswer/:answerId/",
			Auth.isAuthenticatedUser(),
			userController.deleteMyAnswer);

router.post("/requestAcess/:questionId/",
			Auth.isAuthenticatedUser(),
			userController.requestAcess);
router.post("/createFolder/",
			Auth.isAuthenticatedUser(),
			userController.createFolder);

router.get("/getParentFolder/",
			Auth.isAuthenticatedUser(),
			userController.getParentFolder);

router.get("/getSubfolder/:parentId/",
				Auth.isAuthenticatedUser(),
				userController.getSubfolder);
module.exports = router;
