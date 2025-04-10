

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ setUser }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!role) newErrors.role = 'Role selection is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        name,
        password,
        role: role.charAt(0).toUpperCase() + role.slice(1),
      });

      if (response.status === 200) {
        const user = response.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

        if (user.role === 'Seller') {
          navigate('/sellerdashboard');
        } else if (user.role === 'Buyer') {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login failed:', error.response || error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <div style={styles.logo}>MyShop</div>
        <div style={styles.navButtons}>
          <button style={styles.navButton} onClick={() => navigate('/login')}>Login</button>
          <button style={styles.navButton} onClick={() => navigate('/signup')}>Signup</button>
        </div>
      </nav>

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-field">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-field">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-field">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && <p className="error">{errors.role}</p>}
          </div>
          <button type="submit" className="submit-button">Login</button>
          <div className="signup-link">
            <button onClick={() => navigate('/signup')} className="signup-button">Don't have an account? Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    color: '#fff',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'black',
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
  },
  navButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
