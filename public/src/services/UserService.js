import api from "./http";

class UserService {

    getUsers(usernameQuery, limit) {
        return api.get("/users", {
            params: {
                usernameQuery,
                limit
            }
        });
    }
    
    create(username, firstName, lastName, password) {
        return api.post("/users", {
            username,
            first_name: firstName,
            last_name: lastName,
            password,
        });
    }

    editUser(user_id, username, first_name, last_name) {
        return api.patch(`/users/${user_id}`, {
            username, first_name, last_name
        });
    }

}

export default new UserService();