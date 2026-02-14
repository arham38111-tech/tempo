import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('teachers');
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState({ username: '', password: '' });

  const API_BASE_URL = 'http://localhost:5000/api';

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchAdminData();
  }, [user]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError('');

      const [teachersRes, studentsRes, coursesRes, requestsRes, accountsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/teachers`, { headers }),
        axios.get(`${API_BASE_URL}/admin/students`, { headers }),
        axios.get(`${API_BASE_URL}/admin/courses`, { headers }),
        axios.get(`${API_BASE_URL}/admin/teacher-requests`, { headers }),
        axios.get(`${API_BASE_URL}/admin/teacher-accounts/unallocated`, { headers }),
      ]);

      setTeachers(teachersRes.data.teachers || []);
      setStudents(studentsRes.data.students || []);
      setCourses(coursesRes.data.courses || []);
      setRequests(requestsRes.data.requests || []);
      setAccounts(accountsRes.data.accounts || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/admin/teacher-accounts/create`,
        newAccount,
        { headers }
      );
      setNewAccount({ username: '', password: '' });
      fetchAdminData();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating account');
    }
  };

  const handleApproveCourse = async (courseId) => {
    try {
      await axios.put(
        `${API_BASE_URL}/admin/courses/${courseId}/approve`,
        {},
        { headers }
      );
      fetchAdminData();
    } catch (err) {
      setError(err.response?.data?.message || 'Error approving course');
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      await axios.put(
        `${API_BASE_URL}/admin/teacher-requests/${requestId}/approve`,
        {},
        { headers }
      );
      fetchAdminData();
    } catch (err) {
      setError(err.response?.data?.message || 'Error approving request');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3 style={{ marginBottom: '1.5rem' }}>Admin Panel</h3>
        <ul className="sidebar-menu">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('teachers');
              }}
              className={activeTab === 'teachers' ? 'active' : ''}
            >
              Teachers
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('students');
              }}
              className={activeTab === 'students' ? 'active' : ''}
            >
              Students
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('courses');
              }}
              className={activeTab === 'courses' ? 'active' : ''}
            >
              Courses
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('requests');
              }}
              className={activeTab === 'requests' ? 'active' : ''}
            >
              Requests
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('accounts');
              }}
              className={activeTab === 'accounts' ? 'active' : ''}
            >
              Accounts
            </a>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>

        {error && <div className="alert alert-error">{error}</div>}

        {activeTab === 'teachers' && (
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Manage Teachers</h2>
            {teachers.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher._id}>
                      <td>{teacher.name}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.role}</td>
                      <td>
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No teachers found.</p>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <h2 style={{ marginBottom: '1rem' }}>View Students</h2>
            {students.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No students found.</p>
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Manage Courses</h2>
            {courses.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Teacher</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id}>
                      <td>{course.title}</td>
                      <td>{course.teacherId?.name || 'Unknown'}</td>
                      <td>${course.finalPrice}</td>
                      <td>{course.approved ? 'Approved' : 'Pending'}</td>
                      <td>
                        {!course.approved && (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleApproveCourse(course._id)}
                            style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No courses found.</p>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Teacher Requests</h2>
            {requests.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.userId?.name || 'Unknown'}</td>
                      <td>{req.message}</td>
                      <td>{req.status}</td>
                      <td>
                        {req.status === 'pending' && (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleApproveRequest(req._id)}
                            style={{ padding: '0.5rem 1rem' }}
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No requests found.</p>
            )}
          </div>
        )}

        {activeTab === 'accounts' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Teacher Account Management</h2>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Create New Account</h3>
              <form onSubmit={handleCreateAccount} style={{ maxWidth: '400px' }}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={newAccount.username}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, username: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={newAccount.password}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, password: e.target.value })
                    }
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Account
                </button>
              </form>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Unallocated Accounts</h3>
            {accounts.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account._id}>
                      <td>{account.username}</td>
                      <td>
                        <span style={{ color: '#28a745' }}>Available</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No unallocated accounts found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
