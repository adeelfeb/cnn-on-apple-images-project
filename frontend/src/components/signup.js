// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     password: '',
//     city: '',
//     phone: '',
//     role: 'Buyer',
//     image: null,
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       formDataToSend.append(key, value);
//     });

//     try {
//       await axios.post('http://localhost:5000/api/signup', formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert('Signup successful!');
//       navigate('/login'); // Redirect to login page
//     } catch (error) {
//       console.error(error);
//       alert('Signup failed. Try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <input type="text" name="city" placeholder="City" onChange={handleChange} required />
//         <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
//         <select name="role" onChange={handleChange} required>
//           <option value="Buyer">Buyer</option>
//           <option value="Seller">Seller</option>
//         </select>
//         <input type="file" name="image" onChange={handleFileChange} required />
//         <button type="submit">Signup</button>
//       </form>
//       <button onClick={() => navigate('/login')}>Already have an account? Login</button>
//     </div>
//   );
// };

// export default SignupPage;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './SignupPage.css'; // Import the CSS file

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     password: '',
//     city: '',
//     phone: '',
//     role: 'Buyer',
//     image: null,
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       formDataToSend.append(key, value);
//     });

//     try {
//       await axios.post('http://localhost:5000/api/signup', formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert('Signup successful!');
//       navigate('/login'); // Redirect to login page
//     } catch (error) {
//       console.error(error);
//       alert('Signup failed. Try again.');
//     }
//   };

//   return (
//     <div>
//          <nav style={styles.navbar}>
//         <div style={styles.logo} >
//           MyShop
//         </div>
//         <div style={styles.navButtons}>
//           <button style={styles.navButton} onClick={() => navigate("/login")}>
//             Login
//           </button>
//           <button style={styles.navButton} onClick={() => navigate("/signup")}>
//             Signup
//           </button>
//         </div>
//       </nav>
//     <div className="signup-container">
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <h2>Signup</h2>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           onChange={handleChange}
//           required
//         />
//         <select name="role" onChange={handleChange} required>
//           <option value="Buyer">Buyer</option>
//           <option value="Seller">Seller</option>
//         </select>
//         <p>Add your image</p>
//         <input type="file" name="image" onChange={handleFileChange} required />
//         <button type="submit">Signup</button>
//         <div className="login-link">
//           <p>
//             Already have an account?{' '}
//             <a href="#" onClick={() => navigate('/login')}>
//               Login
//             </a>
//           </p>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default SignupPage;


// const styles = {
//   navbar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '10px 20px',
//     // backgroundColor: '#007bff',
//     backgroundColor: '#f8f9fa',
//     color: '#fff',
//   },
//   logo: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     color:'black'
//   },
//   navButtons: {
//     display: 'flex',
//     gap: '10px',
//   },
//   navButton: {
//     backgroundColor: '#007bff',
//     color: '#fff',
//     padding: '8px 15px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '1rem',
//   },
// };




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    city: '',
    phone: '',
    role: 'Buyer',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!/^\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10-15 digits';
    if (!formData.image) newErrors.image = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      await axios.post('http://localhost:5000/api/signup', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Signup failed. Try again.');
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
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          {errors.name && <p className="error">{errors.name}</p>}
          
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          {errors.password && <p className="error">{errors.password}</p>}
          
          <input type="text" name="city" placeholder="City" onChange={handleChange} required />
          {errors.city && <p className="error">{errors.city}</p>}
          
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
          {errors.phone && <p className="error">{errors.phone}</p>}
          
          <select name="role" onChange={handleChange} required>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
          
          <p>Add your image</p>
          <input type="file" name="image" onChange={handleFileChange} required />
          {errors.image && <p className="error">{errors.image}</p>}
          
          <button type="submit">Signup</button>
          <div className="login-link">
            <p>
              Already have an account? <a href="#" onClick={() => navigate('/login')}>Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

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
