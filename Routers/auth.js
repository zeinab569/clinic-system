const express = require("express")
const { verifySignUp } = require("../Middlelwares");
const controller = require("../Controllers/auth");
const router = express.Router();

module.exports = function(app) {
  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  router.post("/api/auth/signin", controller.signin);

  router.post("/api/auth/signout", controller.signout);
};

module.exports = router;