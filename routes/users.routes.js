module.exports = (app) => {
  const users = require("../controllers/users.controller.js");
  var router = require("express").Router();

  router.get("/", users.findAll);
  router.get("/:id/friends", users.findFriends);
  router.get("/:id/mutuals", users.findMutuals);

  app.use("/api/users", router);
};
