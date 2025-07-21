// Utility functions for subscription management

/**
 * Check if a merchant has an active subscription
 * @param {Object} user - User object from Redux state
 * @returns {boolean} - True if merchant has active subscription
 */
export const isMerchantSubscribed = (user) => {
  return user?.role === 'MERCHANT' && 
         user?.subscription && 
         user?.subscription.status === 'active';
};

/**
 * Check if user can access a specific feature based on their subscription
 * @param {Object} user - User object from Redux state
 * @param {string} feature - Feature to check access for ('ads', 'coupons', 'analytics')
 * @returns {boolean} - True if user can access the feature
 */
export const canAccessFeature = (user, feature) => {
  if (user?.role !== 'MERCHANT') {
    return true; // Non-merchants can access (adjust as needed)
  }
  
  if (!isMerchantSubscribed(user)) {
    return false;
  }

  // Add specific feature checks based on subscription plan
  switch (feature) {
    case 'ads':
      return user?.subscription?.planName === 'Basic' || 
             user?.subscription?.planName === 'Premium' || 
             user?.subscription?.planName === 'Ultimate';
    case 'coupons':
      return user?.subscription?.planName === 'Premium' || 
             user?.subscription?.planName === 'Ultimate';
    case 'analytics':
      return user?.subscription?.planName === 'Premium' || 
             user?.subscription?.planName === 'Ultimate';
    case 'unlimited_ads':
      return user?.subscription?.planName === 'Premium' || 
             user?.subscription?.planName === 'Ultimate';
    case 'priority_support':
      return user?.subscription?.planName === 'Premium' || 
             user?.subscription?.planName === 'Ultimate';
    case 'featured_listings':
      return user?.subscription?.planName === 'Ultimate';
    default:
      return true;
  }
};

/**
 * Get subscription plan limits
 * @param {Object} user - User object from Redux state
 * @returns {Object} - Object with plan limits
 */
export const getSubscriptionLimits = (user) => {
  if (!isMerchantSubscribed(user)) {
    return {
      maxAds: 0,
      maxCoupons: 0,
      hasAnalytics: false,
      hasPrioritySupport: false,
      hasFeaturedListings: false
    };
  }

  const planName = user?.subscription?.planName;
  
  switch (planName) {
    case 'Basic':
      return {
        maxAds: 10,
        maxCoupons: 0,
        hasAnalytics: false,
        hasPrioritySupport: false,
        hasFeaturedListings: false
      };
    case 'Premium':
      return {
        maxAds: -1, // unlimited
        maxCoupons: 5,
        hasAnalytics: true,
        hasPrioritySupport: true,
        hasFeaturedListings: false
      };
    case 'Ultimate':
      return {
        maxAds: -1, // unlimited
        maxCoupons: -1, // unlimited
        hasAnalytics: true,
        hasPrioritySupport: true,
        hasFeaturedListings: true
      };
    default:
      return {
        maxAds: 0,
        maxCoupons: 0,
        hasAnalytics: false,
        hasPrioritySupport: false,
        hasFeaturedListings: false
      };
  }
};

/**
 * Format currency amount from cents to dollars
 * @param {number} amount - Amount in cents
 * @param {string} currency - Currency code (default: 'cad')
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'cad') => {
  if (!amount) return '$0.00';
  const dollars = (amount / 100).toFixed(2);
  return `$${dollars}`;
};

/**
 * Format date string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Check if subscription is expiring soon (within 7 days)
 * @param {Object} user - User object from Redux state
 * @returns {boolean} - True if subscription expires within 7 days
 */
export const isSubscriptionExpiringSoon = (user) => {
  if (!isMerchantSubscribed(user)) return false;
  
  const endDate = new Date(user?.subscription?.currentPeriodEnd);
  const now = new Date();
  const daysUntilExpiry = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
  
  return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
};

/**
 * Get subscription status color for UI
 * @param {Object} user - User object from Redux state
 * @returns {string} - Color hex code
 */
export const getSubscriptionStatusColor = (user) => {
  if (!isMerchantSubscribed(user)) return '#FF6B35'; // Orange for no subscription
  
  if (isSubscriptionExpiringSoon(user)) return '#FFC107'; // Yellow for expiring soon
  if (user?.subscription?.cancelAtPeriodEnd) return '#DC3545'; // Red for cancelled
  
  return '#28A745'; // Green for active
};

/**
 * Get subscription status text for UI
 * @param {Object} user - User object from Redux state
 * @returns {string} - Status text
 */
export const getSubscriptionStatusText = (user) => {
  if (!isMerchantSubscribed(user)) return 'No Subscription';
  
  if (user?.subscription?.cancelAtPeriodEnd) return 'Cancelling';
  if (isSubscriptionExpiringSoon(user)) return 'Expiring Soon';
  
  return 'Active';
}; 