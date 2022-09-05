import api from "./http";

class ReplyService {
    
    deleteReply(project_id, issue_id, reply_id) {
        return api.delete(`/projects/${project_id}/issues/${issue_id}/replies/${reply_id}`);
    }

}

export default new ReplyService();