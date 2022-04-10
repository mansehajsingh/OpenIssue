import api from "./http";

class AuthService {
    getSelf() {
        return api.get("/token/self");
    }

    createToken(username, password) {
        return api.post("/token", {
            username,
            password,
        })
    }
}

export default new AuthService();