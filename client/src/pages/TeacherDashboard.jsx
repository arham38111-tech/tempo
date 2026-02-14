import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    price: '',
  });

  const API_BASE_URL = 'http://localhost:5000/api';

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      navigate('/');
      return;
    }

    fetchTeacherData();
  }, [user]);

  const fetchTeacherData = async () => {
    try {
      setLoading(true);
      setError('');

      const [coursesRes, salesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/teacher/courses`, { headers }),
        axios.get(`${API_BASE_URL}/teacher/sales/overview`, { headers }),
      ]);

      setCourses(coursesRes.data.courses || []);
      setSales(salesRes.data || {});
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      if (!newCourse.title || !newCourse.description || !newCourse.subject || !newCourse.class || !newCourse.price) {
        setError('All fields are required');
        return;
      }

      await axios.post(
        `${API_BASE_URL}/teacher/courses`,
        {
          ...newCourse,
          price: parseFloat(newCourse.price),
        },
        { headers }
      );

      setNewCourse({
        title: '',
        description: '',
        subject: '',
        class: '',
        price: '',
      });

      fetchTeacherData();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding course');
    }
  };

  if (!user || user.role !== 'teacher') {
    return null;
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading teacher dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3 style={{ marginBottom: '1.5rem' }}>Teacher Portal</h3>
        <ul className="sidebar-menu">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('courses');
              }}
              className={activeTab === 'courses' ? 'active' : ''}
            >
              My Courses
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('add-course');
              }}
              className={activeTab === 'add-course' ? 'active' : ''}
            >
              Add Course
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('sales');
              }}
              className={activeTab === 'sales' ? 'active' : ''}
            >
              Sales & Revenue
            </a>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h1 style={{ marginBottom: '2rem' }}>Teacher Dashboard</h1>

        {error && <div className="alert alert-error">{error}</div>}

        {activeTab === 'courses' && (
          <div>
            <h2 style={{ marginBottom: '1rem' }}>My Courses</h2>
            {courses.length > 0 ? (
              <div className="grid">
                {courses.map((course) => (
                  <div key={course._id} className="card">
                    <h3 style={{ marginBottom: '0.5rem' }}>{course.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      {course.subject} • {course.class}
                    </p>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      {course.description.substring(0, 100)}...
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#999' }}>Price</p>
                        <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#1565C0' }}>
                          ${course.finalPrice}
                        </p>
                      </div>
                      <p style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: course.approved ? '#d4edda' : '#fff3cd',
                        color: course.approved ? '#155724' : '#856404',
                        borderRadius: '0.25rem',
                        fontSize: '0.9rem',
                      }}>
                        {course.approved ? 'Approved' : 'Pending'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No courses yet. Create your first course!</p>
            )}
          </div>
        )}

        {activeTab === 'add-course' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Create New Course</h2>
            <form onSubmit={handleAddCourse} style={{ maxWidth: '600px' }}>
              <div className="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  rows="4"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="e.g., Mathematics"
                    value={newCourse.subject}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, subject: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Class</label>
                  <input
                    type="text"
                    placeholder="e.g., Grade 10"
                    value={newCourse.class}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, class: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Base Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newCourse.price}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, price: e.target.value })
                  }
                  required
                />
                {newCourse.price && (
                  <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                    Final Price (with 3% markup): ${(parseFloat(newCourse.price) * 1.03).toFixed(2)}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Create Course
              </button>
            </form>
          </div>
        )}

        {activeTab === 'sales' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Sales & Revenue</h2>

            {sales && (
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '2rem' }}>
                <div className="card" style={{ background: 'linear-gradient(135deg, #1565C0 0%, #0d47a1 100%)', color: 'white' }}>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Total Revenue</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>${sales.totalRevenue || 0}</p>
                </div>

                <div className="card" style={{ background: 'linear-gradient(135deg, #FFD600 0%, #ffb300 100%)', color: '#333' }}>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Total Sales</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{sales.totalSales || 0}</p>
                </div>

                <div className="card" style={{ background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)', color: 'white' }}>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Active Courses</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{sales.courseCount || 0}</p>
                </div>
              </div>
            )}

            <h3 style={{ marginBottom: '1rem' }}>Course Sales Breakdown</h3>
            {sales && sales.courses && sales.courses.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Price</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.courses.map((course) => (
                    <tr key={course._id}>
                      <td>{course.title}</td>
                      <td>${course.finalPrice}</td>
                      <td>{course.totalSales || 0}</td>
                      <td>${course.revenue || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No sales data available yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
