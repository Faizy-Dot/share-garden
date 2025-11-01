import axiosInstance from '../config/axios';

class SGTipActivityService {
    // Fetch SGTip activity (recent likes and shares)
    async getSGTipActivity(sgTipId, limit = 10) {
        try {
            const response = await axiosInstance.get(`/api/sgtips/${sgTipId}/activity?limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching SGTip activity:', error);
            throw error;
        }
    }

    // Like a SGTip
    async likeSGTip(sgTipId) {
        try {
            const response = await axiosInstance.post(`/api/sgtips/${sgTipId}/like`);
            return response.data;
        } catch (error) {
            console.error('Error liking SGTip:', error);
            throw error;
        }
    }

    // Share a SGTip
    async shareSGTip(sgTipId, shareType = 'GENERAL') {
        try {
            console.log('📡 Share API Request:', {
                url: `/api/sgtips/${sgTipId}/share`,
                method: 'POST',
                body: { shareType }
            });
            
            const response = await axiosInstance.post(`/api/sgtips/${sgTipId}/share`, {
                shareType
            });
            
            console.log('📥 Share API Raw Response:', response);
            console.log('📥 Share API Response Data:', response.data);
            console.log('📥 Share API Response Status:', response.status);
            
            return response.data;
        } catch (error) {
            console.error('❌ Error sharing SGTip:', error);
            console.error('❌ Error response data:', error?.response?.data);
            console.error('❌ Error response status:', error?.response?.status);
            throw error;
        }
    }

    // Note: Like status should be included in the SGTip detail response
    // No separate API call needed for checking like status

    // Get SGTip stats (likes, shares, views)
    async getSGTipStats(sgTipId) {
        try {
            const response = await axiosInstance.get(`/api/sgtips/${sgTipId}/stats`);
            return response.data;
        } catch (error) {
            console.error('Error fetching SGTip stats:', error);
            throw error;
        }
    }
}

// Create a singleton instance
const sgtipActivityService = new SGTipActivityService();

export default sgtipActivityService;
