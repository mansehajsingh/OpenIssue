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

}

export default new IssueService();