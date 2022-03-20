/* require dependencies */
const express = require("express");
const { authenticateToken } = require("./middlewares/authentication");

/* important inits */
const router = express.Router();
const apiRouter = express.Router();

/* router use statements */
router.use("/api", apiRouter);

/* require controllers */
const TokenController = require("./controllers/TokenController");
const UserController = require("./controllers/UserController");

/* configure routes */
apiRouter.post("/token", TokenController.generateToken);

apiRouter.post("/user", UserController.createUser);

module.exports = router;