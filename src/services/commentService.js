import axiosInstance from '../config/axios';

class CommentService {
    // Fetch comments for a SGTip
    async getSGTipComments(sgTipId, page = 1, limit = 20) {
        try {
            const response = await axiosInstance.get(`/api/sgtip-comments/sgtip/${sgTipId}?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching SGTip comments:', error);
            throw error;
        }
    }

    // Add a new comment to a SGTip
    async addComment(sgTipId, content) {
        try {
            const response = await axiosInstance.post(`/api/sgtip-comments/sgtip/${sgTipId}`, {
                content: content.trim()
            });
            console.log('Comment service response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }

    // Edit an existing comment
    async editComment(commentId, content) {
        try {
            const response = await axiosInstance.put(`/api/sgtip-comments/${commentId}`, {
                content: content.trim()
            });
            return response.data;
        } catch (error) {
            console.error('Error editing comment:', error);
            throw error;
        }
    }

    // Delete a comment
    async deleteComment(commentId) {
        try {
            const response = await axiosInstance.delete(`/api/sgtip-comments/${commentId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }

    // Add a reply to a comment
    async addReply(commentId, content) {
        try {
            const response = await axiosInstance.post(`/api/sgtip-comments/${commentId}/reply`, {
                content: content.trim()
            });
            return response.data;
        } catch (error) {
            console.error('Error adding reply:', error);
            throw error;
        }
    }
}

// Create a singleton instance
const commentService = new CommentService();

export default commentService;
