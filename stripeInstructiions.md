# React Native App Tasks for Subscription Integration

## Task 1: Add Subscription Status Check to User State
- In your user context or state management, add a function to check if merchant is subscribed
- Add this function:
```javascript
const isMerchantSubscribed = () => {
  return user?.role === 'MERCHANT' && 
         user?.subscription && 
         user?.subscription.status === 'active';
};
```

## Task 2: Update Login/Profile API Calls
- Modify your login API call to handle the new subscription data in response
- The API now returns `subscription` field for merchants
- Store this subscription data in your user state

## Task 3: Create Subscription Status Component
- Create a component that shows subscription status
- Display plan name, status, and expiry date
- Show "Subscribe" button if no active subscription

## Task 4: Add Subscription Check Before Features
- Before allowing merchant to create ads, check `isMerchantSubscribed()`
- Before allowing merchant to create coupons, check `isMerchantSubscribed()`
- If not subscribed, show subscription screen instead

## Task 5: Create Subscription Screen
- Show available subscription plans
- Add "Buy Package" button for each plan
- Implement Stripe Payment Sheet for payment
- Handle payment success/failure

## Task 6: Add Subscription Service
- Create service file for subscription API calls
- Add functions:
  - `getSubscriptionPlans()` - fetch plans from API
  - `createSubscription(planId)` - create subscription
  - `getCurrentSubscription()` - get user's current subscription

## Task 7: Update Navigation
- Add subscription screen to navigation
- Add subscription status to profile screen
- Redirect to subscription screen when merchant tries to access premium features

## Task 8: Handle Subscription States
- Show loading state during payment
- Show success message after payment
- Show error message if payment fails
- Update user state after successful subscription

## Task 9: Add Subscription Check to Protected Routes
- Create a wrapper component that checks subscription
- Use this wrapper around merchant-only screens
- Redirect to subscription screen if not subscribed

## Task 10: Test Subscription Flow
- Test login with merchant account
- Test subscription purchase flow
- Test accessing premium features with/without subscription
- Test subscription expiry handling

## Complete API Endpoints with Payloads and Responses:

### 1. Get Subscription Plans
**Endpoint:** `GET /api/subscriptions/plans`  
**Authentication:** Not required  
**Payload:** None

**Response:**
```json
{
  "plans": [
    {
      "id": "price_basic_day",
      "name": "Basic",
      "type": "DAY",
      "amount": 2000,
      "currency": "cad",
      "description": "Perfect for small businesses",
      "features": [
        "Create up to 10 ads",
        "Basic analytics",
        "Email support"
      ]
    },
    {
      "id": "price_premium_day",
      "name": "Premium", 
      "type": "DAY",
      "amount": 5000,
      "currency": "cad",
      "description": "For growing businesses",
      "features": [
        "Create unlimited ads",
        "Advanced analytics",
        "Priority support",
        "Featured listings"
      ]
    }
  ]
}
```

### 2. Create Subscription
**Endpoint:** `POST /api/subscriptions/create`  
**Authentication:** Required (Bearer token)  
**Payload:**
```json
{
  "planId": "price_basic_day",
  "paymentMethodId": "pm_card_visa"
}
```

**Response (Success):**
```json
{
  "subscription": {
    "id": "sub_uuid",
    "stripeSubscriptionId": "sub_stripe_id",
    "userId": "user_uuid",
    "planName": "Basic",
    "planType": "DAY",
    "amount": 2000,
    "currency": "cad",
    "status": "active",
    "currentPeriodStart": "2024-07-18T10:00:00.000Z",
    "currentPeriodEnd": "2024-07-25T10:00:00.000Z",
    "cancelAtPeriodEnd": false,
    "createdAt": "2024-07-18T10:00:00.000Z",
    "updatedAt": "2024-07-18T10:00:00.000Z"
  },
  "message": "Subscription created successfully"
}
```

**Response (Error):**
```json
{
  "error": "Payment failed",
  "message": "Your payment could not be processed"
}
```

### 3. Get Current Subscription
**Endpoint:** `GET /api/subscriptions/current`  
**Authentication:** Required (Bearer token)  
**Payload:** None

**Response (Has Subscription):**
```json
{
  "subscription": {
    "id": "sub_uuid",
    "stripeSubscriptionId": "sub_stripe_id",
    "userId": "user_uuid",
    "planName": "Basic",
    "planType": "DAY",
    "amount": 2000,
    "currency": "cad",
    "status": "active",
    "currentPeriodStart": "2024-07-18T10:00:00.000Z",
    "currentPeriodEnd": "2024-07-25T10:00:00.000Z",
    "cancelAtPeriodEnd": false,
    "createdAt": "2024-07-18T10:00:00.000Z",
    "updatedAt": "2024-07-18T10:00:00.000Z"
  }
}
```

**Response (No Subscription):**
```json
{
  "subscription": null
}
```

### 4. Cancel Subscription
**Endpoint:** `POST /api/subscriptions/cancel`  
**Authentication:** Required (Bearer token)  
**Payload:** None

**Response:**
```json
{
  "subscription": {
    "id": "sub_uuid",
    "stripeSubscriptionId": "sub_stripe_id",
    "userId": "user_uuid",
    "planName": "Basic",
    "planType": "DAY",
    "amount": 2000,
    "currency": "cad",
    "status": "active",
    "currentPeriodStart": "2024-07-18T10:00:00.000Z",
    "currentPeriodEnd": "2024-07-25T10:00:00.000Z",
    "cancelAtPeriodEnd": true,
    "createdAt": "2024-07-18T10:00:00.000Z",
    "updatedAt": "2024-07-18T10:00:00.000Z"
  },
  "message": "Subscription will be cancelled at the end of current period"
}
```

### 5. Reactivate Subscription
**Endpoint:** `POST /api/subscriptions/reactivate`  
**Authentication:** Required (Bearer token)  
**Payload:** None

**Response:**
```json
{
  "subscription": {
    "id": "sub_uuid",
    "stripeSubscriptionId": "sub_stripe_id",
    "userId": "user_uuid",
    "planName": "Basic",
    "planType": "DAY",
    "amount": 2000,
    "currency": "cad",
    "status": "active",
    "currentPeriodStart": "2024-07-18T10:00:00.000Z",
    "currentPeriodEnd": "2024-07-25T10:00:00.000Z",
    "cancelAtPeriodEnd": false,
    "createdAt": "2024-07-18T10:00:00.000Z",
    "updatedAt": "2024-07-18T10:00:00.000Z"
  },
  "message": "Subscription reactivated successfully"
}
```

### 6. Get Subscription History
**Endpoint:** `GET /api/subscriptions/history`  
**Authentication:** Required (Bearer token)  
**Payload:** None

**Response:**
```json
{
  "subscriptions": [
    {
      "id": "sub_uuid_1",
      "planName": "Basic",
      "planType": "DAY",
      "amount": 2000,
      "currency": "cad",
      "status": "cancelled",
      "currentPeriodStart": "2024-07-11T10:00:00.000Z",
      "currentPeriodEnd": "2024-07-18T10:00:00.000Z",
      "cancelAtPeriodEnd": true,
      "createdAt": "2024-07-11T10:00:00.000Z",
      "cancelledAt": "2024-07-15T10:00:00.000Z"
    },
    {
      "id": "sub_uuid_2",
      "planName": "Premium",
      "planType": "DAY", 
      "amount": 5000,
      "currency": "cad",
      "status": "active",
      "currentPeriodStart": "2024-07-18T10:00:00.000Z",
      "currentPeriodEnd": "2024-07-25T10:00:00.000Z",
      "cancelAtPeriodEnd": false,
      "createdAt": "2024-07-18T10:00:00.000Z"
    }
  ]
}
```

### 7. Updated Login API
**Endpoint:** `POST /api/auth/login`  
**Authentication:** Not required  
**Payload:**
```json
{
  "email": "merchant@example.com",
  "password": "password123",
  "deviceToken": "fcm_token_here",
  "deviceType": "android"
}
```

**Response (Merchant with Subscription):**
```json
{
  "id": "user_uuid",
  "email": "merchant@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "MERCHANT",
  "subscription": {
    "id": "sub_uuid",
    "planName": "Basic",
    "planType": "DAY",
    "amount": 2000,
    "currency": "cad",
    "status": "active",
    "currentPeriodStart": "2024-07-18T10:00:00.000Z",
    "currentPeriodEnd": "2024-07-25T10:00:00.000Z",
    "cancelAtPeriodEnd": false
  },
  "token": "jwt_token_here",
  "message": "Login successful"
}
```

**Response (Merchant without Subscription):**
```json
{
  "id": "user_uuid",
  "email": "merchant@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "MERCHANT",
  "subscription": null,
  "token": "jwt_token_here",
  "message": "Login successful"
}
```

### 8. Updated Get Profile API
**Endpoint:** `GET /api/auth/profile`  
**Authentication:** Required (Bearer token)  
**Payload:** None

**Response (Merchant with Subscription):**
```json
{
  "id": "user_uuid",
  "email": "merchant@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "about": "Business description",
  "profileImage": "https://s3.amazonaws.com/profile.jpg",
  "gender": "male",
  "dateOfBirth": "1990-01-01T00:00:00.000Z",
  "sgPoints": 150,
  "role": "MERCHANT",
  "postalCode": "A1B2C3",
  "address1": "123 Main St",
  "address2": "Apt 4",
  "province": "Ontario",
  "city": "Toronto",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-07-18T00:00:00.000Z",
  "subscription": {
    "id": "sub_uuid",
    "planName": "Basic",
    "planType": "DAY",
    "amount": 2000,
    "currency": "cad",
    "status": "active",
    "currentPeriodStart": "2024-07-18T10:00:00.000Z",
    "currentPeriodEnd": "2024-07-25T10:00:00.000Z",
    "cancelAtPeriodEnd": false
  }
}
```

**Response (Merchant without Subscription):**
```json
{
  "id": "user_uuid",
  "email": "merchant@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "about": "Business description",
  "profileImage": "https://s3.amazonaws.com/profile.jpg",
  "gender": "male",
  "dateOfBirth": "1990-01-01T00:00:00.000Z",
  "sgPoints": 150,
  "role": "MERCHANT",
  "postalCode": "A1B2C3",
  "address1": "123 Main St",
  "address2": "Apt 4",
  "province": "Ontario",
  "city": "Toronto",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-07-18T00:00:00.000Z",
  "subscription": null
}
```

### 9. Webhook Endpoint (Backend Only)
**Endpoint:** `POST /api/subscriptions/webhook`  
**Authentication:** Stripe signature verification  
**Payload:** Stripe webhook event

**Response:**
```json
{
  "received": true
}
```

## Key Data Structure:
```javascript
user.subscription = {
  id: "sub-uuid",
  planName: "Basic",
  planType: "DAY", 
  amount: 2000,
  currency: "cad",
  status: "active",
  currentPeriodStart: "2024-07-18T10:00:00.000Z",
  currentPeriodEnd: "2024-07-25T10:00:00.000Z",
  cancelAtPeriodEnd: false
}
```

## Simple Check Function:
```javascript
const canAccessPremiumFeatures = () => {
  return user?.role === 'MERCHANT' && 
         user?.subscription?.status === 'active';
};
```

## Implementation Notes:
- Use Stripe Payment Sheet for secure payments
- Handle webhook events for subscription updates
- Store subscription data in user context/state
- Check subscription status before allowing premium features
- Show appropriate UI based on subscription status
- Handle subscription expiry gracefully 