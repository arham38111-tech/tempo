import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from './Logo';
import LoginModal from './LoginModal';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [defaultLoginTab, setDefaultLoginTab] = useState('student');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLoginClick = (tab) => {
    setDefaultLoginTab(tab);
    setShowLoginModal(true);
  };

  const getDashboardLink = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'admin':
        return '/admin-dashboard';
      case 'teacher':
        return '/teacher-dashboard';
      case 'student':
        return '/student-dashboard';
      default:
        return null;
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <Logo className="navbar-logo" />
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li>
              <Link to={getDashboardLink()}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar-buttons">
          {user ? (
            <>
              <span style={{ marginRight: '1rem', fontWeight: '500' }}>
                Welcome, {user.name || user.email}
              </span>
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => handleLoginClick('student')}
                title="Click to login as Student"
              >
                👨‍🎓 Student
              </button>
              <button
                className="btn btn-outline"
                style={{
                  borderColor: 'var(--blue)',
                  color: 'var(--blue)',
                  background: 'rgba(21, 101, 192, 0.05)',
                }}
                onClick={() => handleLoginClick('teacher')}
                title="Click to login as Teacher"
              >
                👨‍🏫 Teacher
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleLoginClick('admin')}
                title="Click to login as Admin"
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                  padding: '0.75rem 1.2rem',
                  fontSize: '0.95rem',
                }}
              >
                🔐 Admin
              </button>
            </>
          )}
        </div>
      </nav>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          defaultTab={defaultLoginTab}
        />
      )}
    </>
  );
};

export default Navbar;
