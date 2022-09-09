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
const IssueController = require("./controllers/IssueController");
const ReplyController = require("./controllers/ReplyController");

/* configure api routes */
apiRouter.post("/token", TokenController.generateToken);
apiRouter.delete("/token", authenticateToken, TokenController.invalidateToken);
apiRouter.get("/token/self", authenticateToken, TokenController.getSelfFromToken);

apiRouter.get("/users", UserController.getUsers);
apiRouter.post("/users", UserController.createUser);
apiRouter.get("/users/:user_id", authenticateToken, UserController.getUser);
apiRouter.get("/users/:user_id/projects", authenticateToken, UserController.getProjects);
apiRouter.patch("/users/:user_id", authenticateToken, UserController.editUser);

apiRouter.post("/projects", authenticateToken, ProjectController.createProject);
apiRouter.get("/projects/:project_id", authenticateToken, ProjectController.getProject);

apiRouter.get("/projects/:project_id/members", authenticateToken, ProjectController.getMembers);
apiRouter.post("/projects/:project_id/members", authenticateToken, ProjectController.addMember);
apiRouter.delete("/projects/:project_id/members/:user_id", authenticateToken, ProjectController.deleteMember);

apiRouter.get("/projects/:project_id/issues/:issue_id", authenticateToken, IssueController.getIssue);
apiRouter.delete("/projects/:project_id/issues/:issue_id", authenticateToken, IssueController.deleteIssue);
apiRouter.post("/projects/:project_id/issues", authenticateToken, IssueController.createIssue);
apiRouter.get("/projects/:project_id/issues", authenticateToken, IssueController.getIssuesByProject);
apiRouter.patch("/projects/:project_id/issues/:issue_id/status", authenticateToken, IssueController.editStatus);

apiRouter.post("/projects/:project_id/issues/:issue_id/replies", authenticateToken, ReplyController.createReply);
apiRouter.get("/projects/:project_id/issues/:issue_id/replies", authenticateToken, ReplyController.getReplies);
apiRouter.delete("/projects/:project_id/issues/:issue_id/replies/:reply_id", authenticateToken, ReplyController.deleteReply);

router.get(/^\/(?!api($|\/.*))/, (req, res) => { res.sendFile(path.join(__dirname, "public", "index.html")) });

module.exports = router;