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
const ProjectController = require("./controllers/ProjectController");

/* configure api routes */
apiRouter.post("/token", TokenController.generateToken);
apiRouter.delete("/token", authenticateToken, TokenController.invalidateToken);
apiRouter.get("/token/self", authenticateToken, TokenController.getSelfFromToken);

apiRouter.post("/users", UserController.createUser);
apiRouter.get("/users/:user_id", authenticateToken, UserController.getUser);
apiRouter.get("/users/:user_id/projects", authenticateToken, UserController.getProjects)

apiRouter.post("/projects", authenticateToken, ProjectController.createProject);
apiRouter.get("/projects/:project_id", authenticateToken, ProjectController.getProject);
apiRouter.post("/projects/:project_id/members", authenticateToken, ProjectController.addMember);

router.get(/^\/(?!api($|\/.*))/, (req, res) => { res.sendFile(path.join(__dirname, "public", "index.html")) });

module.exports = router;