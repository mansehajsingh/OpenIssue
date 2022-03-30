/* require dependencies */
const express = require("express");
const { authenticateToken } = require("./middlewares/authentication");
const path = require("path");

/* important inits */
const router = express.Router();
const apiRouter = express.Router();

/* router use statements */
router.use("/api", apiRouter);

/* require controllers */
const TokenController = require("./controllers/TokenController");
const UserController = require("./controllers/UserController");

/* configure api routes */
apiRouter.post("/token", TokenController.generateToken);
apiRouter.delete("/token", authenticateToken, TokenController.invalidateToken);
apiRouter.get("/token/self", authenticateToken, TokenController.getSelfFromToken)

apiRouter.post("/users", UserController.createUser);
apiRouter.get("/users/:user_id", authenticateToken, UserController.getUser);

/* base level static route */
router.get(/^\/(?!api($|\/.*))/, (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

module.exports = router;