import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose, isOpen, defaultTab = 'student' }) => {
  const [loginType, setLoginType] = useState(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:5000/api';

  // Update loginType when defaultTab changes
  useEffect(() => {
    setLoginType(defaultTab);
  }, [defaultTab]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      login(response.data.user, response.data.token);
      onClose();
      navigate('/student-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/teacher-login`, {
        username,
        password,
      });

      login(response.data.user, response.data.token);
      onClose();
      navigate('/teacher-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/admin-login`, {
        username,
        password,
      });

      login(response.data.user, response.data.token);
      onClose();
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });

      login(response.data.user, response.data.token);
      onClose();
      navigate('/student-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{showRegister ? 'Create Account' : 'Login to Tempo'}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {!showRegister ? (
          <>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
              <button
                type="button"
                style={{
                  padding: '0.5rem 1rem',
                  background: loginType === 'student' ? '#1565C0' : 'transparent',
                  color: loginType === 'student' ? 'white' : 'inherit',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '0.5rem',
                }}
                onClick={() => setLoginType('student')}
              >
                Student
              </button>
              <button
                type="button"
                style={{
                  padding: '0.5rem 1rem',
                  background: loginType === 'teacher' ? '#1565C0' : 'transparent',
                  color: loginType === 'teacher' ? 'white' : 'inherit',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '0.5rem',
                }}
                onClick={() => setLoginType('teacher')}
              >
                Teacher
              </button>
              <button
                type="button"
                style={{
                  padding: '0.5rem 1rem',
                  background: loginType === 'admin' ? '#1565C0' : 'transparent',
                  color: loginType === 'admin' ? 'white' : 'inherit',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setLoginType('admin')}
              >
                Admin
              </button>
            </div>

            {loginType === 'student' && (
              <form onSubmit={handleStudentLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            )}

            {loginType === 'teacher' && (
              <form onSubmit={handleTeacherLogin}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Logging in...' : 'Login as Teacher'}
                </button>
              </form>
            )}

            {loginType === 'admin' && (
              <form onSubmit={handleAdminLogin}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Logging in...' : 'Login as Admin'}
                </button>
              </form>
            )}

            {loginType === 'student' && (
              <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setShowRegister(true)}
                  style={{ background: 'none', border: 'none', color: '#1565C0', cursor: 'pointer' }}
                >
                  Create one
                </button>
              </p>
            )}
          </>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setShowRegister(false)}
                style={{ background: 'none', border: 'none', color: '#1565C0', cursor: 'pointer' }}
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
