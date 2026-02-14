const express = require('express');
const {
  createSubscription,
  getUserSubscription,
  getAllSubscriptions,
  updateSubscriptionStatus,
  cancelSubscription,
  renewSubscription,
  getSubscriptionStats,
} = require('../controllers/subscriptionController');
const { authenticate } = require('../middleware/auth');
const { roleCheck } = require('../middleware/role');

const router = express.Router();

// Create a subscription
router.post('/', authenticate, createSubscription);

// Get user's subscription
router.get('/user/:userId', authenticate, getUserSubscription);

// Get all subscriptions (admin only)
router.get('/', authenticate, roleCheck(['admin']), getAllSubscriptions);

// Get subscription stats (admin only)
router.get('/stats/overview', authenticate, roleCheck(['admin']), getSubscriptionStats);

// Update subscription status (admin only)
router.patch('/:subscriptionId/status', authenticate, roleCheck(['admin']), updateSubscriptionStatus);

// Cancel subscription
router.patch('/:subscriptionId/cancel', authenticate, cancelSubscription);

// Renew subscription
router.patch('/:subscriptionId/renew', authenticate, renewSubscription);

module.exports = router;
