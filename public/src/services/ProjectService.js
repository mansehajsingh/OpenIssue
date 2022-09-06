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

    getIssues(project_id) {
        return api.get(`/projects/${project_id}/issues`);
    }

    createIssue(project_id, title, content, flairs, priority) {
        return api.post(`/projects/${project_id}/issues`, {
            title, content, flairs, priority
        });
    }

    addMember(project_id, user_id) {
        return api.post(`/projects/${project_id}/members`, {
            user_id
        });
    }

    deleteMember(project_id, user_id) {
        return api.delete(`/projects/${project_id}/members/${user_id}`);
    }

}

export default new ProjectService();