import ApiCaller from '../config/ApiCaller';

class SubscriptionService {
  // Helper method to get auth headers
  static getAuthHeaders() {
    // Import store dynamically to avoid circular dependencies
    const store = require('../redux/store').default;
    const state = store.getState();
    const user = state.login?.user;
    const token = user?.token;
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  // Get available subscription plans
  static async getSubscriptionPlans() {
    try {
      // No authentication required for this endpoint
      const response = await ApiCaller.Get('/api/subscriptions/plans', '', {});
      console.log('Plans API response:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      throw error;
    }
  }

  // Create a new subscription
  static async createSubscription(priceId) {
    try {
      const headers = this.getAuthHeaders();
      const payload = {
        priceId: priceId
      };
      
      const response = await ApiCaller.Post('/api/subscriptions', payload, headers);
      return response.data;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }

  // Get user's current subscription
  static async getCurrentSubscription() {
    try {
      const headers = this.getAuthHeaders();
      const response = await ApiCaller.Get('/api/subscriptions/current', '', headers);
      return response.data;
    } catch (error) {
      console.error('Error fetching current subscription:', error);
      throw error;
    }
  }

  // Cancel subscription
  static async cancelSubscription() {
    try {
      const headers = this.getAuthHeaders();
      const response = await ApiCaller.Post('/api/subscriptions/cancel', {}, headers);
      return response.data;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  // Reactivate subscription
  static async reactivateSubscription() {
    try {
      const headers = this.getAuthHeaders();
      const response = await ApiCaller.Post('/api/subscriptions/reactivate', {}, headers);
      return response.data;
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      throw error;
    }
  }

  // Get subscription history
  static async getSubscriptionHistory() {
    try {
      const headers = this.getAuthHeaders();
      const response = await ApiCaller.Get('/api/subscriptions/history', '', headers);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription history:', error);
      throw error;
    }
  }



  // Test subscription plans endpoint
  static async testSubscriptionPlans() {
    try {
      console.log('Testing subscription plans endpoint...');
      const response = await ApiCaller.Get('/api/subscriptions/plans', '', {});
      console.log('✅ Subscription plans endpoint - Success:', response.status);
      console.log('Plans response:', JSON.stringify(response.data, null, 2));
      return { success: true, response: response.data };
    } catch (error) {
      console.log('❌ Subscription plans endpoint - Failed:', error.message);
      if (error.response) {
        console.log('Error response:', JSON.stringify(error.response.data, null, 2));
      }
      return { success: false, error: error.message };
    }
  }


}

export default SubscriptionService; 