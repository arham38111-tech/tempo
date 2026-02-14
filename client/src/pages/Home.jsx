import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Hero from '../components/Hero';
import LoginModal from '../components/LoginModal';
import SubscriptionTiers from '../components/SubscriptionTiers';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [defaultLoginTab, setDefaultLoginTab] = useState('student');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, subjectsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/student/featured'),
        axios.get('http://localhost:5000/api/student/subjects'),
      ]);

      setCourses(coursesRes.data.data || []);
      setSubjects(subjectsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = (tab) => {
    setDefaultLoginTab(tab);
    setShowLoginModal(true);
  };

  const calculateFinalPrice = (price) => {
    return (price * 1.03).toFixed(2);
  };

  const handleSubscribe = (planName, price) => {
    alert(`Selected ${planName} plan at ₨${price.toLocaleString()}/month. Redirecting to payment...`);
    handleLoginClick('student');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Hero Section */}
      <Hero
        onStudentLogin={() => handleLoginClick('student')}
        onTeacherLogin={() => handleLoginClick('teacher')}
        onAdminLogin={() => handleLoginClick('admin')}
      />

      {/* Features Section */}
      <section className="features-section" style={{ padding: '4rem 2rem', background: '#ffffff' }}>
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#1565C0' }}>
            Why Choose Tempo?
          </h2>

          <motion.div
            className="features-grid"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              { icon: '🎯', title: 'Curated Content', desc: 'Hand-picked courses from industry experts' },
              { icon: '📱', title: 'Learn Anytime', desc: 'Access courses 24/7 on any device' },
              { icon: '💡', title: 'Expert Teachers', desc: 'Learn from professionals with real experience' },
              { icon: '✅', title: 'Certificates', desc: 'Get recognized certificates upon completion' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={item}
                className="feature-card"
                style={{
                  padding: '2rem',
                  borderRadius: '1rem',
                  background: '#f8f9fa',
                  textAlign: 'center',
                  border: '2px solid #F0F0F0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                whileHover={{
                  transform: 'translateY(-10px)',
                  boxShadow: '0 15px 40px rgba(21, 101, 192, 0.1)',
                  borderColor: '#1565C0',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ marginBottom: '0.5rem', color: '#1565C0' }}>{feature.title}</h3>
                <p style={{ color: '#666', margin: 0 }}>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #1565C0 0%, #0d47a1 100%)',
        color: 'white',
      }}>
        <motion.div
          className="container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.1 }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>1000+</h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Active Courses</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>500+</h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Expert Teachers</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>50K+</h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Happy Students</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>4.9⭐</h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Average Rating</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Courses Section */}
      <section style={{ padding: '4rem 2rem', background: '#f8f9fa' }}>
        <motion.div
          className="container"
          style={{ maxWidth: '1200px', margin: '0 auto' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#1565C0' }}>
            Featured Courses
          </h2>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Loading courses...</p>
            </div>
          ) : courses.length > 0 ? (
            <motion.div
              className="courses-grid"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem',
              }}
            >
              {courses.map((course, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="course-card"
                  style={{
                    background: 'white',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #f0f0f0',
                    transition: 'all 0.3s ease',
                  }}
                  whileHover={{
                    transform: 'translateY(-10px)',
                    boxShadow: '0 15px 40px rgba(21, 101, 192, 0.15)',
                  }}
                >
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #1565C0 0%, #FFD600 100%)',
                      height: '180px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '3rem',
                    }}
                  >
                    📚
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ color: '#1565C0', marginBottom: '0.5rem' }}>
                      {course.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                      {course.subject} • Class {course.class}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', color: '#999' }}>
                        {course.enrolledStudents?.length || 0} students enrolled
                      </span>
                      <span style={{ color: '#FFD600', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        ⭐ 4.8
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        marginBottom: '1rem',
                      }}
                    >
                      <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#1565C0' }}>
                        ₨{Math.ceil(calculateFinalPrice(course.price) * 150)}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#999', textDecoration: 'line-through' }}>
                        ₨{Math.ceil(course.price * 150)}
                      </span>
                    </div>

                    <motion.button
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        fontSize: '0.95rem',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLoginClick('student')}
                    >
                      Enroll Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>No courses available yet</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '4rem 2rem', background: '#ffffff' }}>
        <motion.div
          className="container"
          style={{ maxWidth: '1200px', margin: '0 auto' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#1565C0' }}>
            Browse by Subject
          </h2>

          <motion.div
            className="categories-grid"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {subjects.map((subject, i) => (
              <motion.div
                key={i}
                variants={item}
                style={{
                  padding: '2rem',
                  background: 'linear-gradient(135deg, rgba(21, 101, 192, 0.1) 0%, rgba(255, 214, 0, 0.1) 100%)',
                  borderRadius: '1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  borderColor: '#1565C0',
                  transform: 'scale(1.05)',
                  boxShadow: '0 10px 30px rgba(21, 101, 192, 0.2)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  {['🧮', '🔬', '📖', '🎨', '💻', '⚡'][i % 6]}
                </div>
                <h3 style={{ color: '#1565C0', marginBottom: '0.5rem' }}>{subject}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  {Math.floor(Math.random() * 50) + 10} courses
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Subscription Tiers Section */}
      <SubscriptionTiers onSubscribe={handleSubscribe} />

      {/* CTA Section */}
      <section
        style={{
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, #1565C0 0%, #FFD600 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
            Ready to start learning?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.95 }}>
            Join thousands of students and teachers on Tempo. Sign up in seconds!
          </p>

          <motion.button
            className="btn btn-secondary"
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              marginRight: '1rem',
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLoginClick('student')}
          >
            Start Learning
          </motion.button>

          <motion.button
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.08, background: 'rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLoginClick('teacher')}
          >
            Teach on Tempo
          </motion.button>
        </motion.div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          defaultTab={defaultLoginTab}
        />
      )}
    </div>
  );
};

export default Home;
