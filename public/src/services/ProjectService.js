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

    editProject(project_id, name, description) {
        return api.patch(`/projects/${project_id}`, {
            name, description
        });
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

    deleteProject(project_id) {
        return api.delete(`/projects/${project_id}`);
    }

    transferProject(project_id, new_owner_id) {
        return api.patch(`/projects/${project_id}/owner`, { new_owner_id });
    }

}

export default new ProjectService();