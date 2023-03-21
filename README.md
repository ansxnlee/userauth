# userauth

Sandbox for restricting API requests to authorized users with session cookies.

technologies
---
- express-sessions handles cookies sent out as responses
- redis is used as the session store alongside express-sessions
- passwords are hashed using node's crypto module
- typescript provdes type safe session data sent back and forth between the server and client

login/logout functionality
---
- login uses a request body provided username + (clientside hashed) password thats checked against the postgresql database and creates a session cookie when validated
- logout requests require session authentication and destroys the respective session when validated

some security concerns
---
hijacking - malicious user discovers an active session and disguises as a target user
> MITM prevented by using SSL/TLS (cookies are only transmitted on secure connections)

> XSS mitigated by enabling HTTP-only cookies for sessions

> reduce chance of weak entropy attacks by regenerating ID upon user login

csrf - target user's session gets tricked into doing something for a malicious user
> use same-site cookies

> don't use GET requests to mutate data and regen sessionID as needed

session tampering - malicious user is able to manupulate session data
> if this can happen there's bigger problems with the system
