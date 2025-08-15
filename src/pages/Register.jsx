import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'staff', // default role
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Username, email, and password are required.');
      setSuccess('');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:8080/PahanaBillingSystem_war/register',
        formData, // JSON body
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // if backend uses cookies/sessions
        }
      );

      if (res.status === 200 || res.status === 201) {
        setSuccess('Registration successful! Redirecting to login...');
        setError('');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError('Registration failed. Please try again.');
        setSuccess('');
      }
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '15px' }}>
        <h2 className="text-center mb-3">Create an Account 📝</h2>
        <p className="text-center text-muted mb-4">Join Pahana Edu and manage your billing with ease</p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control rounded-pill"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control rounded-pill"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control rounded-pill"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-success w-100 rounded-pill">Register</button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">Already have an account?</span>
          <button
            className="btn btn-link"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
