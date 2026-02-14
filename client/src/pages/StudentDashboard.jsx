import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('browse');
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ subject: '', class: '', search: '' });

  const API_BASE_URL = 'http://localhost:5000/api';

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/');
      return;
    }

    fetchStudentData();
  }, [user]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError('');

      const [browsRes, subjectsRes, classesRes, purchasedRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/student/browse`, { headers }),
        axios.get(`${API_BASE_URL}/student/subjects`, { headers }),
        axios.get(`${API_BASE_URL}/student/classes`, { headers }),
        axios.get(`${API_BASE_URL}/student/purchased-courses`, { headers }),
      ]);

      setCourses(browsRes.data.courses || []);
      setFilteredCourses(browsRes.data.courses || []);
      setSubjects(subjectsRes.data.subjects || []);
      setClasses(classesRes.data.classes || []);
      setPurchasedCourses(purchasedRes.data.courses || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = courses;

    if (filters.subject) {
      filtered = filtered.filter(course => course.subject === filters.subject);
    }

    if (filters.class) {
      filtered = filtered.filter(course => course.class === filters.class);
    }

    if (filters.search) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, courses]);

  const handlePurchase = async (courseId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/student/course/${courseId}/purchase`,
        {},
        { headers }
      );
      fetchStudentData();
    } catch (err) {
      setError(err.response?.data?.message || 'Error purchasing course');
    }
  };

  if (!user || user.role !== 'student') {
    return null;
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading student dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3 style={{ marginBottom: '1.5rem' }}>Student Portal</h3>
        <ul className="sidebar-menu">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('browse');
              }}
              className={activeTab === 'browse' ? 'active' : ''}
            >
              Browse Courses
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('purchased');
              }}
              className={activeTab === 'purchased' ? 'active' : ''}
            >
              My Courses
            </a>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h1 style={{ marginBottom: '2rem' }}>Student Dashboard</h1>

        {error && <div className="alert alert-error">{error}</div>}

        {activeTab === 'browse' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Browse Courses</h2>

            {/* Filters */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '0.5rem',
              marginBottom: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Search</label>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Subject</label>
                <select
                  value={filters.subject}
                  onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                >
                  <option value="">All Subjects</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Class</label>
                <select
                  value={filters.class}
                  onChange={(e) => setFilters({ ...filters, class: e.target.value })}
                >
                  <option value="">All Classes</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid">
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    className="card"
                    whileHover={{ scale: 1.05 }}
                  >
                    {course.thumbnail && (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        style={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '0.25rem',
                          marginBottom: '1rem',
                        }}
                      />
                    )}

                    <h3 style={{ marginBottom: '0.5rem' }}>{course.title}</h3>

                    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      by {course.teacherId?.name || 'Unknown'}
                    </p>

                    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      {course.subject} • {course.class}
                    </p>

                    <p style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      marginBottom: '1rem',
                      minHeight: '60px',
                      overflow: 'hidden',
                    }}>
                      {course.description.substring(0, 100)}...
                    </p>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#1565C0',
                      }}>
                        ${course.finalPrice}
                      </span>

                      <button
                        className="btn btn-primary"
                        onClick={() => handlePurchase(course._id)}
                        style={{ marginBottom: 0, padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                      >
                        Enroll
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                No courses found matching your filters.
              </p>
            )}
          </div>
        )}

        {activeTab === 'purchased' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>My Courses</h2>

            {purchasedCourses.length > 0 ? (
              <div className="grid">
                {purchasedCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    className="card"
                    whileHover={{ scale: 1.05 }}
                  >
                    {course.thumbnail && (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        style={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '0.25rem',
                          marginBottom: '1rem',
                        }}
                      />
                    )}

                    <h3 style={{ marginBottom: '0.5rem' }}>{course.title}</h3>

                    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      by {course.teacherId?.name || 'Unknown'}
                    </p>

                    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      {course.subject} • {course.class}
                    </p>

                    {course.videoUrl && (
                      <div
                        style={{
                          backgroundColor: '#f0f0f0',
                          padding: '1rem',
                          borderRadius: '0.25rem',
                          marginBottom: '1rem',
                          textAlign: 'center',
                        }}
                      >
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                          Video Available
                        </p>
                        <a
                          href={course.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          style={{ fontSize: '0.9rem' }}
                        >
                          Watch Course
                        </a>
                      </div>
                    )}

                    <p style={{ color: '#28a745', fontSize: '0.9rem', fontWeight: '500' }}>
                      ✓ Enrolled
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                You haven't enrolled in any courses yet. Start learning today!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
