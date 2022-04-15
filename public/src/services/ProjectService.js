import api from "./http"

class ProjectService {

    getAllByUser(user_id) {
        return api.get(`/users/${user_id}/projects`);
    }

    createProject(name, description) {
        return api.post("/projects", {
            name,
            description,
        });
    }

    getProject(project_id) {
        return api.get(`/projects/${project_id}`);
    }

    getMembers(project_id) {
        return api.get(`/projects/${project_id}/members`);
    }

}

export default new ProjectService();