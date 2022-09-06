import api from "./http";

class IssueService {

    getIssue(project_id, issue_id) {
        return api.get(`/projects/${project_id}/issues/${issue_id}`);
    }

    createReply(issue_id, project_id, content) {
        return api.post(`/projects/${project_id}/issues/${issue_id}/replies`, {
            content
        });
    }

    getReplies(issue_id, project_id) {
        return api.get(`/projects/${project_id}/issues/${issue_id}/replies`);
    }

    changeIssueStatus(issue_id, project_id, newStatus) {
        return api.patch(`/projects/${project_id}/issues/${issue_id}/status`, {
            status: newStatus
        });
    }

    deleteIssue(project_id, issue_id) {
        return api.delete(`/projects/${project_id}/issues/${issue_id}`);
    }

}

export default new IssueService();