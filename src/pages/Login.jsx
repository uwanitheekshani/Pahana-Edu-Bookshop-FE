// import React, { useState } from 'react';
// import api from '../api';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     navigate('/dashboard');
//     try {
//       const res = await api.post(`/login`, null, {
//         params: { email, password }
//       });
//       localStorage.setItem('user', JSON.stringify(res.data));
//       navigate('/dashboard');
      
//     } catch {
//       setError('Invalid email or password');
//     }
//   };


//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
//         <h2 className="text-center mb-3">Welcome Back 👋</h2>
//         <p className="text-center text-muted mb-4">Sign in to continue to Pahana Edu</p>

//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <label className="form-label">Email Address</label>
//             <input
//               type="email"
//               className="form-control rounded-pill"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control rounded-pill"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button className="btn btn-primary w-100 rounded-pill">Sign In</button>
//         </form>

//         <div className="text-center mt-3">
//           <span className="text-muted">Don't have an account?</span>
//           <button
//             className="btn btn-link"
//             onClick={() => navigate('/register')}
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:8080/PahanaBillingSystem_war/login',
        null, // No body because params go in query string
        {
          params: { email, password },
        }
      );
    
      if (res.data && res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
       console.error(err);
  setError('Invalid email or password.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}
      >
        <h2 className="text-center mb-3">Welcome Back 👋</h2>
        <p className="text-center text-muted mb-4">
          Sign in to continue to Pahana Edu
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control rounded-pill"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100 rounded-pill">Sign In</button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">Don't have an account?</span>
          <button
            className="btn btn-link"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
