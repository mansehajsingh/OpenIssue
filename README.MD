<p align="center">
  <img align="center" width="500px" src="https://user-images.githubusercontent.com/76667723/160268980-9e682d11-895f-4d2d-a606-41a257174e56.svg">
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


## Custom Authentication Implementation

Softverse uses a custom authentication implementation built to maintain minimal state while still allowing secure logout. Traditional JWT implementations use the added complexity of a refresh token (which is not actually stateless, which sort of takes away from the major selling point of JWT authentication) to ensure that the access token can be revoked of its priveleges and only have a short usage window. Instead, softverse uses stateful authentication with JWT in a way that minimizes the amount of state that must be maintained by the application.
<br><br>
Since JWTs are signed and cannot be edited without invalidation the token, they can be set to expire after a set period of time (eg. 14 days) without actually needing to maintain the expiration datetime server-side. This already greatly cuts down on the amount of state the application has to preserve compared to previous versions of this system. To ensure a secure logout, a session_id is maintained in the database which is required in the token payload and validated against the session_id stored in the database for the user's user id. This way, if the session_id is nullified or changed the old token becomes invalid. The JWT is stored in an http only cookie, so it is sent along with every request and can be validated by a middleware whenever a route needs to be protected. Storing it in an http only cookie as opposed to local storage also prevents cross-site scripting attacks (XSS).
