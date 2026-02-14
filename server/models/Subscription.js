const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan: {
      type: String,
      enum: ['Starter', 'Professional', 'Premium'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'PKR',
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'paused', 'expired'],
      default: 'active',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    renewalDate: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      default: 'card',
    },
    autoRenew: {
      type: Boolean,
      default: true,
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    notes: String,
  },
  { timestamps: true }
);

// Calculate renewal date (30 days from now)
subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    this.endDate = endDate;
    this.renewalDate = endDate;
  }
  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
