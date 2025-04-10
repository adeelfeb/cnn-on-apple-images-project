import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/login';
import SellerDashboard from './components/sellerdashboard';
import SignupPage from './components/signup';
import HomePage from './components/homepage';
import BuyNowPage from './components/BuyNowPage';
import BuyNowFinalPage from './components/BuyNowFinal'; // Import the BuyNowFinalPage
import AuctionPage from './components/Auctiondisplay';
import SellerDashboardid from './components/Sellerid';
import BidForm from './components/Bidform';

const App = () => {
  const [user, setUser] = useState(null);

  // Check if there's a stored user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/product/:id" element={<BuyNowPage />} />
        <Route
          path="/sellerdashboard"
          element={user ? <SellerDashboard user={user} /> : <Navigate to="/login" />}
        />
        {/* Add the BuyNowFinal route with the dynamic product ID */}
        <Route path="/buyNowFinal/:id" element={<BuyNowFinalPage />} />
        <Route path="/auctiondisplay" element={<AuctionPage />} />
        <Route path="/sellerid" element={<SellerDashboardid />} />
        <Route path="/bid" element={<BidForm />} />

      </Routes>
    </Router>
  );
};

export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';  // Correct import

// import LoginPage from './components/login';
// import SellerDashboard from './components/sellerdashboard';
// import SignupPage from './components/signup';
// import HomePage from './components/homepage';
// import BuyNowPage from './components/BuyNowPage';
// import BuyNowFinalPage from './components/BuyNowFinal';

// const App = () => {
//   const [user, setUser] = useState(null);

//    // Check if there's a stored token in localStorage
//    useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUser(decodedToken);  // Set user state with decoded token
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage setUser={setUser} />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/product/:id" element={<BuyNowPage />} />
//         <Route
//           path="/sellerdashboard"
//           element={user ? <SellerDashboard user={user} /> : <Navigate to="/login" />}
//         />
//         <Route path="/buyNowFinal/:id" element={<BuyNowFinalPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
