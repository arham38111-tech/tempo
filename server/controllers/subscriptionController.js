const Subscription = require('../models/Subscription');
const User = require('../models/User');

// Create subscription
const createSubscription = async (req, res) => {
  try {
    const { userId, plan, price } = req.body;

    // Validate plan
    const validPlans = ['Starter', 'Professional', 'Premium'];
    if (!validPlans.includes(plan)) {
      return res.status(400).json({ message: 'Invalid subscription plan' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate end date (30 days from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const subscription = new Subscription({
      userId,
      plan,
      price,
      endDate,
      renewalDate: endDate,
      status: 'active',
    });

    await subscription.save();

    res.status(201).json({
      message: 'Subscription created successfully',
      data: subscription,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: 'Failed to create subscription', error: error.message });
  }
};

// Get user subscription
const getUserSubscription = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscription = await Subscription.findOne({
      userId,
      status: 'active',
    }).populate('userId', 'name email');

    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found' });
    }

    res.json({
      message: 'Subscription retrieved successfully',
      data: subscription,
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ message: 'Failed to fetch subscription', error: error.message });
  }
};

// Get all subscriptions (admin)
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Subscriptions retrieved successfully',
      data: subscriptions,
      count: subscriptions.length,
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ message: 'Failed to fetch subscriptions', error: error.message });
  }
};

// Update subscription status
const updateSubscriptionStatus = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const { status } = req.body;

    const validStatuses = ['active', 'cancelled', 'paused', 'expired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid subscription status' });
    }

    const subscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { status },
      { new: true, runValidators: true }
    );

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.json({
      message: 'Subscription updated successfully',
      data: subscription,
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ message: 'Failed to update subscription', error: error.message });
  }
};

// Cancel subscription
const cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    const subscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { status: 'cancelled' },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.json({
      message: 'Subscription cancelled successfully',
      data: subscription,
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ message: 'Failed to cancel subscription', error: error.message });
  }
};

// Renew subscription
const renewSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const { plan, price } = req.body;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Calculate new end date
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    subscription.plan = plan || subscription.plan;
    subscription.price = price || subscription.price;
    subscription.endDate = endDate;
    subscription.renewalDate = endDate;
    subscription.status = 'active';

    await subscription.save();

    res.json({
      message: 'Subscription renewed successfully',
      data: subscription,
    });
  } catch (error) {
    console.error('Error renewing subscription:', error);
    res.status(500).json({ message: 'Failed to renew subscription', error: error.message });
  }
};

// Get subscription stats (admin)
const getSubscriptionStats = async (req, res) => {
  try {
    const totalSubscriptions = await Subscription.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const cancelledSubscriptions = await Subscription.countDocuments({ status: 'cancelled' });

    // Revenue by plan
    const revenueByPlan = await Subscription.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$plan',
          totalRevenue: { $sum: '$price' },
          count: { $sum: 1 },
        },
      },
    ]);

    // Total revenue
    const totalRevenue = await Subscription.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: null, total: { $sum: '$price' } } },
    ]);

    res.json({
      message: 'Subscription stats retrieved successfully',
      data: {
        totalSubscriptions,
        activeSubscriptions,
        cancelledSubscriptions,
        revenueByPlan,
        totalMonthlyRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching subscription stats:', error);
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
};

module.exports = {
  createSubscription,
  getUserSubscription,
  getAllSubscriptions,
  updateSubscriptionStatus,
  cancelSubscription,
  renewSubscription,
  getSubscriptionStats,
};
