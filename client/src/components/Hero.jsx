import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onStudentLogin, onTeacherLogin, onAdminLogin }) => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [
    { color: '#1565C0', accent: '#FFD600' },
    { color: '#0d47a1', accent: '#FFD600' },
    { color: '#1565C0', accent: '#ffb300' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentBg = backgrounds[backgroundIndex];

  return (
    <div
      className="hero"
      style={{
        background: `linear-gradient(135deg, ${currentBg.color} 0%, ${currentBg.accent} 100%)`,
        transition: 'all 0.8s ease-in-out',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
      >
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800' }}>
          Upgrade Your Learning with Premium Courses
        </h1>
        <p style={{ fontSize: '1.4rem', marginBottom: '3rem', opacity: 0.95 }}>
          Access world-class education from expert teachers. Learn at your pace, master any subject.
        </p>

        <div className="hero-buttons" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <motion.button
            className="btn btn-secondary"
            whileHover={{ scale: 1.08, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onStudentLogin}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              minWidth: '280px',
            }}
          >
            👨‍🎓 Student Login
          </motion.button>

          <motion.button
            className="btn btn-outline"
            style={{
              borderColor: 'white',
              color: 'white',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              minWidth: '280px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
            whileHover={{ scale: 1.08, background: 'rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onTeacherLogin}
          >
            👨‍🏫 Teacher Login
          </motion.button>

          <motion.button
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              minWidth: '280px',
              background: 'linear-gradient(135deg, rgba(255, 82, 82, 0.9) 0%, rgba(238, 90, 111, 0.9) 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(255, 82, 82, 0.4)',
            }}
            whileHover={{ scale: 1.08, boxShadow: '0 8px 25px rgba(255, 82, 82, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onAdminLogin}
          >
            🔐 Admin Login
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            marginTop: '3rem',
            fontSize: '0.95rem',
            fontStyle: 'italic',
            opacity: 0.9,
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            backdropFilter: 'blur(10px)',
            maxWidth: '500px',
            margin: '3rem auto 0',
          }}
        >
          ✨ Click any button above to login or register<br />
          <span style={{ fontSize: '0.85rem' }}>Students: Register new account • Teachers & Admin: Use provided credentials</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
