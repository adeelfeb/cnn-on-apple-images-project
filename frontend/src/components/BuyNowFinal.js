// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BuyNowFinalPage = () => {
//   const location = useLocation();
//   const { product, quantity } = location.state; // Get the product and quantity from location state
//   const [buyerName, setBuyerName] = useState("");
//   const [buyerPhone, setBuyerPhone] = useState("");
//   const [buyerAddress, setBuyerAddress] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Calculate total price
//   const totalPrice = (product.price * quantity).toFixed(2);

//   const handleOrderSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const orderData = {
//         productId: product._id,
//         buyerName,
//         buyerPhone,
//         buyerAddress,
//         quantity,
//         totalPrice, // Include total price in the order data
//       };

//       // Send the order data to the backend
//       const response = await axios.post(
//         "http://localhost:5000/api/order",
//         orderData
//       );

//       alert("Order placed successfully!");
//       setLoading(false);
//       navigate("/thank-you"); // Redirect to a thank you page or orders page
//     } catch (error) {
//       setError("Error placing the order. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Confirm Your Order</h1>

//       <div style={styles.productDetails}>
//         <img
//           src={`http://localhost:5000${product.productImage}`}
//           alt={product.productName}
//           style={styles.productImage}
//         />
//         <div style={styles.productInfo}>
//           <h3>{product.productName}</h3>
//           <p>
//             <strong>Seller:</strong> {product.sellerName}
//           </p>
//           <p>
//             <strong>Quantity Available:</strong> {product.quantity} Kg
//           </p>
//           <p>
//             <strong>Price:</strong> ${product.price} per Kg
//           </p>
//           <p>
//             <strong>Description:</strong> {product.description}
//           </p>
//           <p>
//             <strong>Order Quantity:</strong> {quantity} Kg
//           </p>
//           <p>
//             <strong>Total Price:</strong> ${totalPrice}
//           </p>{" "}
//           {/* Displaying total price */}
//         </div>
//       </div>

//       <form onSubmit={handleOrderSubmit} style={styles.form}>
//         <h4>Buyer Details</h4>
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={buyerName}
//           onChange={(e) => setBuyerName(e.target.value)}
//           required
//         />
//         <input
//           type="tel"
//           placeholder="Your Phone Number"
//           value={buyerPhone}
//           onChange={(e) => setBuyerPhone(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Your Address"
//           value={buyerAddress}
//           onChange={(e) => setBuyerAddress(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           style={
//             loading
//               ? { ...styles.button, ...styles.buttonDisabled }
//               : styles.button
//           }
//           disabled={loading}
//         >
//           {loading ? "Placing Order..." : "Order Now"}
//         </button>
//       </form>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// // Inline styles
// const styles = {
//   container: {
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     minHeight: "100vh",
//     backgroundColor: "#f9f9f9",
//   },
//   productDetails: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: "20px",
//     width: "80%",
//     maxWidth: "900px",
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     marginBottom: "30px",
//   },
//   productImage: {
//     width: "200px",
//     height: "200px",
//     objectFit: "cover", // Ensures all images fit within the container
//     borderRadius: "10px",
//     border: "1px solid #ddd",
//     backgroundColor: "#f0f0f0",
//   },
//   productInfo: {
//     flex: "1",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     gap: "10px",
//   },
//   form: {
//     width: "80%",
//     maxWidth: "600px",
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     fontSize: "16px",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//   },
//   textarea: {
//     width: "100%",
//     height: "100px",
//     padding: "10px",
//     fontSize: "16px",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//     resize: "none", // Prevents resizing
//   },
//   button: {
//     padding: "10px 15px",
//     backgroundColor: "#28a745",
//     color: "#fff",
//     fontSize: "16px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     alignSelf: "center",
//     width: "50%",
//     textAlign: "center",
//   },
//   errorMessage: {
//     color: "red",
//     fontSize: "14px",
//     textAlign: "center",
//   },

//   button: {
//     padding: "15px 20px", // Increased padding for a larger size
//     backgroundColor: "#28a745", // Green background
//     color: "#fff", // White text
//     fontSize: "18px", // Larger font size
//     border: "none",
//     borderRadius: "8px", // Slightly rounded corners
//     cursor: "pointer",
//     alignSelf: "center",
//     width: "60%", // Wider button
//     textAlign: "center",
//     transition: "background-color 0.3s ease", // Smooth hover effect
//   },
//   buttonDisabled: {
//     backgroundColor: "#a3d2a1", // Lighter green for disabled state
//     cursor: "not-allowed",
//   },
// };

// export default BuyNowFinalPage;




import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BuyNowFinalPage = () => {
  const location = useLocation();
  const { product, quantity } = location.state;
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const totalPrice = (product.price * quantity).toFixed(2);

  const validateForm = () => {
    let formErrors = {};
    
    if (!/^[A-Za-z ]{10,}$/.test(buyerName)) {
      formErrors.buyerName = "Name must be at least 10 alphabetic characters (no numbers).";
    }

    if (!/^\d{11}$/.test(buyerPhone)) {
      formErrors.buyerPhone = "Phone number must be exactly 11 digits.";
    }

    if (!/^[A-Za-z0-9 ,.-]{16,}$/.test(buyerAddress)) {
      formErrors.buyerAddress = "Address must be at least 16 characters.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        productId: product._id,
        buyerName,
        buyerPhone,
        buyerAddress,
        quantity,
        totalPrice,
      };

      await axios.post("http://localhost:5000/api/order", orderData);

      alert("Order placed successfully!");
      setLoading(false);
      navigate("/thank-you");
    } catch (error) {
      setError("Error placing the order. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/")}>
          MyShop
        </div>
        <input
          type="text"
          placeholder="Search products..."
          style={{ ...styles.searchBar, cursor: "not-allowed", backgroundColor: "#e9ecef" }}
          disabled
        />
        <div style={styles.navButtons}>
          <button style={styles.navButton} onClick={() => navigate("/login")}>
            Login
          </button>
          <button style={styles.navButton} onClick={() => navigate("/signup")}>
            Signup
          </button>
          <button style={styles.navButton} onClick={() => navigate("/auctiondisplay")}>
            Live Auctions
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.container}>
        <h1>Confirm Your Order</h1>

        <div style={styles.productDetails}>
          <img
            src={`http://localhost:5000${product.productImage}`}
            alt={product.productName}
            style={styles.productImage}
          />
          <div style={styles.productInfo}>
            <h3>{product.productName}</h3>
            <p><strong>Seller:</strong> {product.sellerName}</p>
            <p><strong>Quantity Available:</strong> {product.quantity} Kg</p>
            <p><strong>Price:</strong> ${product.price} per Kg</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Order Quantity:</strong> {quantity} Kg</p>
            <p><strong>Total Price:</strong> ${totalPrice}</p>
          </div>
        </div>

        <form onSubmit={handleOrderSubmit} style={styles.form}>
          <h4>Buyer Details</h4>

          <input
            type="text"
            placeholder="Your Name"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />
          {errors.buyerName && <p style={styles.errorText}>{errors.buyerName}</p>}

          <input
            type="tel"
            placeholder="Your Phone Number"
            value={buyerPhone}
            onChange={(e) => setBuyerPhone(e.target.value)}
          />
          {errors.buyerPhone && <p style={styles.errorText}>{errors.buyerPhone}</p>}

          <textarea
            placeholder="Your Address"
            value={buyerAddress}
            onChange={(e) => setBuyerAddress(e.target.value)}
          />
          {errors.buyerAddress && <p style={styles.errorText}>{errors.buyerAddress}</p>}

          <button
            type="submit"
            style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Order Now"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  searchBar: {
    flex: 1,
    margin: "0 20px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  navButtons: {
    display: "flex",
    gap: "10px",
  },
  navButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  container: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
  },
  productDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    width: "80%",
    maxWidth: "900px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
  },
  productImage: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#f0f0f0",
  },
  productInfo: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
  },
  form: {
    width: "80%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
  },
  button: {
    padding: "15px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    alignSelf: "center",
    width: "60%",
  },
  buttonDisabled: {
    backgroundColor: "#a3d2a1",
    cursor: "not-allowed",
  },
};

export default BuyNowFinalPage;
