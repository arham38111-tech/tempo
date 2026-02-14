import React from 'react';
import { motion } from 'framer-motion';

const SubscriptionTiers = ({ onSubscribe }) => {
  const tiers = [
    {
      name: 'Starter',
      price: 2999,
      period: '/month',
      description: 'Perfect for getting started',
      icon: '🚀',
      features: [
        'Access to 50+ courses',
        '3 courses per month limit',
        'Basic support',
        'Certificate of completion',
        'Video quality up to 720p',
      ],
      color: '#4CAF50',
      recommended: false,
    },
    {
      name: 'Professional',
      price: 7999,
      period: '/month',
      description: 'Most popular choice',
      icon: '⭐',
      features: [
        'Access to 500+ courses',
        'Unlimited course access',
        'Priority support',
        'Certificate of completion',
        'Video quality up to 1080p',
        'Monthly assignments',
        'Live Q&A sessions',
        'Lifetime access to courses',
      ],
      color: '#1565C0',
      recommended: true,
    },
    {
      name: 'Premium',
      price: 14999,
      period: '/month',
      description: 'For serious learners',
      icon: '👑',
      features: [
        'Unlimited access to all courses',
        'All Professional features',
        '24/7 dedicated support',
        'Personalized learning path',
        '4K video quality',
        'Monthly webinars with experts',
        'Advanced course materials',
        'Career guidance sessions',
        'Custom learning plans',
      ],
      color: '#FFD600',
      recommended: false,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section style={{ padding: '4rem 2rem', background: '#f8f9fa' }}>
      <motion.div
        className="container"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: '#1565C0' }}>
          Choose Your Plan
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666', marginBottom: '3rem' }}>
          Flexible subscription plans for every learning goal. Cancel anytime.
        </p>

        <motion.div
          className="tiers-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`tier-card ${tier.recommended ? 'recommended' : ''}`}
              style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                border: tier.recommended ? `3px solid ${tier.color}` : '1px solid #e0e0e0',
                position: 'relative',
                transition: 'all 0.3s ease',
                transform: tier.recommended ? 'scale(1.05)' : 'scale(1)',
                boxShadow: tier.recommended
                  ? `0 15px 40px rgba(21, 101, 192, 0.25)`
                  : '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
              whileHover={{
                transform: tier.recommended ? 'scale(1.08)' : 'scale(1.03)',
                boxShadow: `0 20px 50px rgba(21, 101, 192, 0.2)`,
              }}
            >
              {tier.recommended && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: tier.color,
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '2rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: tier.recommended ? '2rem' : '0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{tier.icon}</div>
                <h3 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '0.5rem' }}>
                  {tier.name}
                </h3>
                <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1rem' }}>
                  {tier.description}
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1565C0' }}>
                    ₨{tier.price.toLocaleString()}
                  </span>
                  <span style={{ color: '#666', fontSize: '1rem', marginLeft: '0.5rem' }}>
                    {tier.period}
                  </span>
                </div>

                <motion.button
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    background: tier.recommended ? tier.color : '#1565C0',
                    color: tier.color === '#FFD600' ? '#333' : 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSubscribe(tier.name, tier.price)}
                >
                  Get {tier.name}
                </motion.button>
              </div>

              <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1.5rem' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1565C0', marginBottom: '1rem' }}>
                  Included Features:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {tier.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      style={{
                        padding: '0.6rem 0',
                        color: '#666',
                        fontSize: '0.95rem',
                        borderBottom: '1px solid #f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          color: '#4CAF50',
                          marginRight: '0.8rem',
                          fontSize: '1.2rem',
                        }}
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {tier.recommended && (
                <div
                  style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(21, 101, 192, 0.05)',
                    borderRadius: '0.5rem',
                    borderLeft: `4px solid ${tier.color}`,
                    fontSize: '0.9rem',
                    color: '#333',
                  }}
                >
                  <strong>💡 Best Value:</strong> Saves you 35% vs Pro plan when paid annually
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '2rem', color: '#1565C0' }}>
            Frequently Asked Questions
          </h3>

          <motion.div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                q: 'Can I change my plan anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept credit cards, debit cards, and bank transfers. All payments are secure and encrypted.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! You get a 7-day free trial with access to all Professional features. No credit card required.',
              },
              {
                q: 'Can I cancel my subscription?',
                a: 'Absolutely! You can cancel anytime. You\'ll retain access until the end of your billing period.',
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                whileHover={{ background: '#f5f5f5' }}
                style={{
                  padding: '1.5rem',
                  background: '#fafafa',
                  borderRadius: '0.5rem',
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <h4 style={{ color: '#1565C0', marginBottom: '0.8rem', fontSize: '1.1rem' }}>
                  {faq.q}
                </h4>
                <p style={{ color: '#666', margin: 0 }}>{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SubscriptionTiers;
