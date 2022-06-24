<br>
<br>
<p align="center">
  <img align="center" width="500px" src="https://user-images.githubusercontent.com/76667723/160297092-479f7ebd-092b-4e30-a789-27e8aa9c538b.svg">
</p>

<br>

<p align="center">A collaborative issue tracker web applicaiton.</p>

# Stack (PERN)
<p align="center" vertical-align="middle">
    <img src="https://img.shields.io/badge/-Express-303030?logo=express&logoColor=ffffff&style=for-the-badge&logoWidth=20" height="40"/>
    <img src="https://img.shields.io/badge/-React-282c34?logo=react&logoColor=61DBFB&style=for-the-badge&logoWidth=20" height="40"/>
    <img src="https://img.shields.io/badge/-postgresql-31648c?logo=postgresql&logoColor=ffffff&style=for-the-badge&logoWidth=20" height="40"/>
    <img src="https://img.shields.io/badge/-SASS-CD6799?logo=sass&logoColor=ffffff&style=for-the-badge&logoWidth=20" height="40"/>
    <img src="https://img.shields.io/badge/-Node.js-3c873a?logo=node.js&logoColor=ffffff&style=for-the-badge&logoWidth=20" height="40">
    <img src="https://img.shields.io/badge/-Redux%20Toolkit-764abc?logo=redux&logoColor=ffffff&style=for-the-badge&logoWidth=20" height="40">
</p>

# Docs
## Custom Authentication Implementation

Devwire uses a custom authentication implementation built to maintain minimal state while still allowing secure logout. Traditional JWT implementations use the added complexity of a refresh token (which is not actually stateless, which sort of takes away from the major selling point of JWT authentication) to ensure that the access token can be revoked of its privileges and only have a short usage window. Instead, Devwire uses stateful authentication with JWT in a way that minimizes the amount of state that must be maintained by the application.
<br><br>
Since JWTs are signed and cannot be edited without invalidation of the token, they can be set to expire after a set period of time (eg. 14 days) without actually needing to maintain the expiration datetime server-side. This already greatly cuts down on the amount of state the application has to preserve and computation that the server has to complete compared to previous versions of this system. To ensure a secure logout, a session_id is maintained in the database which is required in the token payload and validated against the session_id stored in the database for the user's user id. This way, if the session_id is nullified or changed the old token becomes invalid. The JWT is stored in an http only cookie, so it is sent along with every request and can be validated by a middleware whenever a route needs to be protected. Storing it in an http only cookie as opposed to local storage also prevents cross-site scripting attacks (XSS).

## API
### Controllers `controllers/` 
Controllers contain the logic that determines how the RESTful API handles requests, including authorization, request processing, and response formulation. In the Devwire RESTful API, the most important resources are given their own controllers. Other resources that depend entirely on other resources without much of their own state are instead handled by the top level resource's controller. For example, there is no controller for `Flairs` despite it being its own model, because they are a child resource of `Issues` without much of their own logic. 

### Routing `routes.js`
Since the controllers are encapsulated as classes, all API routing takes place in the `routes.js` file where controller methods are mapped to their respective URI. However one important note is that the line 
```router.get(/^\/(?!api($|\/.*))/, (req, res) => { res.sendFile(path.join(__dirname, "public", "index.html")) });``` 
inside of `routes.js` serves up the front end at all routes that are not prefixed by `/api` (except for routes for static content that is handled by the `express-static` middleware.

### Models `models/`
This project uses Sequelize as the ORM, and defines models as classes. Each model is contained within its own file and becomes the default export of the file. Then, they are imported into `/models/index.js` where their relationships are defined. Then each model with its relationships is further exported out. 
   
> ⚠️ __ALL OTHER FOLDERS SHOULD IMPORT MODELS FROM `models/index.js` AND NOT FROM THEIR RESPECTIVE MODEL FILES TO ENSURE ASSOCIATIONS ARE PRESERVED IN THE ORM.__

### Middlewares `middlewares/`
All custom middlewares for express should be written into this folder, then applied in either `app.js` or `routes.js` for applying to only certain routes.

### Config `config/`
Just configuration files.

### Scripts `scripts/`
Any scripts that are to be used frequently in the project. For example, `scripts/syncmodels.js` is run to synchronize all model changes inside of the PostgreSQL database.
