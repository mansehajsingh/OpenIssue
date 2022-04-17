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

    createIssue(project_id, title, content, flairs) {
        return api.post(`/projects/${project_id}/issues`, {
            title, content, flairs
        });
    }

}

export default new ProjectService();