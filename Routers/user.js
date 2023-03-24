const { authJwt } = require("../Middlelwares");
const controller = require("../Controllers/user");
const express = require("express")
const router = express.Router();

module.exports = function(app) {
  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/test/all", controller.allAccess);

  router.get("/test/user", [authJwt.verifyToken], controller.userBoard);

  router.get(
    "/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  router.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

module.exports = router;