import api from "./http";

class AuthService {
    getSelf() {
        return api.get("/token/self");
    }

    createToken(username, password) {
        return api.post("/token", {
            username,
            password,
        });
    }

    invalidateToken() {
        return api.delete("/token");
    }
}

export default new AuthService();