import api from "./http";

class IssueService {

    getIssue(project_id, issue_id) {
        return api.get(`/projects/${project_id}/issues/${issue_id}`);
    }

}

export default new IssueService();