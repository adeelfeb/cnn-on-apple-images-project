// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const BuyNowPage = () => {
//   const { id } = useParams(); // Get the productId from the URL
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [quantity, setQuantity] = useState(10); // Default to 10 kg (min order)
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/product/${id}`);
//         setProduct(response.data.product);
//         setRelatedProducts(response.data.relatedProducts);

//         // Alert if product quantity is less than 10 on page load
//         if (response.data.product.quantity < 10) {
//           alert('This product is out of stock as its quantity is less than 10.');
//         }
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       }
//     };

//     fetchProductDetails();
//   }, [id]);

//   if (!product) return <div>Loading...</div>;

//   const handleQuantityChange = (e) => {
//     const selectedQuantity = Number(e.target.value);
//     setQuantity(selectedQuantity);

//     // Alert if the selected quantity is below 10
//     if (selectedQuantity < 10) {
//       alert('The minimum quantity to order is 10 kg.');
//     }
//   };

//   const handleBuyNowClick = () => {
//     // Alert if product quantity is less than 10
//     if (product.quantity < 10) {
//       alert('You cannot buy this product as it is out of stock.');
//       return;
//     }

//     // Alert if the selected quantity is less than the minimum required
//     if (quantity < 10) {
//       alert('Minimum quantity is 10 kg.');
//       return;
//     }

//     // Navigate to BuyNowFinal page, passing product and quantity
//     navigate(`/buyNowFinal/${id}`, { state: { product, quantity } });
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.productDetails}>
//         <div style={styles.productImageContainer}>
//           <img
//             src={`http://localhost:5000${product.productImage}`}
//             alt={product.productName}
//             style={styles.productImage}
//           />
//         </div>
//         <div style={styles.productInfo}>
//           <h2>{product.productName}</h2>
//           <p>{product.description}</p>
//           <p><strong>Quantity in Kg:</strong> {product.quantity} <strong>Kg</strong></p>
//           <p><strong>Price:</strong> ${product.price}</p>
//           <p><strong>Seller:</strong> {product.sellerName}</p>

//           {/* Quantity input */}
//           <input
//             type="number"
//             value={quantity}
//             onChange={handleQuantityChange}
//             min="10"
//             max={product.quantity}
//             disabled={product.quantity < 10} // Disable input if product is out of stock or less than 10
//           />
//           <button
//             style={styles.buyButton}
//             onClick={handleBuyNowClick}
//             disabled={product.quantity < 10} // Disable button if product is out of stock or less than 10
//           >
//             {product.quantity < 10 ? 'Out of Stock' : 'Buy Now'}
//           </button>
//         </div>
//       </div>

//       {/* Related Products */}
//       <h3>Related Products</h3>
//       <div style={styles.relatedProductsContainer}>
//         {relatedProducts.length > 0 ? (
//           relatedProducts.map((relatedProduct) => (
//             <div key={relatedProduct._id} style={styles.relatedProductCard}>
//               <img
//                 src={`http://localhost:5000${relatedProduct.productImage}`}
//                 alt={relatedProduct.productName}
//                 style={styles.relatedProductImage}
//               />
//               <h4>{relatedProduct.productName}</h4>
//               <p>Price: ${relatedProduct.price}</p>
//               <div style={styles.relatedProductActions}>
//                 {/* Buy Now button for related products */}
//                 <button
//                   style={styles.buyButton}
//                   onClick={() => navigate(`/product/${relatedProduct._id}`)} // Navigate to BuyNowPage
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No related products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// // Inline styles
// const styles = {

//   container: {
//     padding: '20px',
//     display: 'flex',
//     flexDirection: 'column', // Arrange the main product and related products in a column
//     alignItems: 'center',
//     minHeight: '100vh',
//   },
//   productDetails: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: '20px',
//     width: '80%',
//     maxWidth: '1200px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     borderRadius: '10px',
//     padding: '20px',
//     backgroundColor: '#fff',
//     marginBottom: '20px', // Space between product details and related products
//   },
//   productImageContainer: {
//     flex: '1',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     maxWidth: '300px',
//     maxHeight: '300px',
//     overflow: 'hidden',
//     border: '1px solid #ddd',
//     borderRadius: '10px',
//     backgroundColor: '#f9f9f9',
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
//   productInfo: {
//     flex: '2',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     gap: '10px',
//   },
//   buyButton: {
//     padding: '10px 15px',
//     backgroundColor: '#28a745',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     marginTop: '10px',
//     alignSelf: 'flex-start',
//   },
//   relatedProductsContainer: {
//     width: '100%',
//     maxWidth: '1200px',
//     display: 'flex',
//     justifyContent: 'space-around', // Ensure products are spaced evenly
//     flexWrap: 'wrap', // Allow wrapping for responsiveness
//     gap: '20px', // Space between products

//   },
//   relatedProductCard: {
//     width: 'calc(25% - 20px)', // Four items per row, accounting for the gap
//     maxWidth: '250px',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//     padding: '10px',
//     textAlign: 'center',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     cursor: 'pointer',
//     backgroundColor: '#fff',
//   },
//   relatedProductImage: {
//     width: '100%',
//     height: '150px',
//     objectFit: 'cover',
//     marginBottom: '10px',
//   },
// };

// export default BuyNowPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuyNowPage = () => {
  const { id } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(10); // Default to 10 kg (min order)
  const [searchTerm] = useState(""); // Search term disabled for this page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/${id}`
        );
        setProduct(response.data.product);
        setRelatedProducts(response.data.relatedProducts);

        // Alert if product quantity is less than 10 on page load
        if (response.data.product.quantity < 10) {
          alert(
            "This product is out of stock as its quantity is less than 10."
          );
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleQuantityChange = (e) => {
    const selectedQuantity = Number(e.target.value);
    setQuantity(selectedQuantity);

    // Alert if the selected quantity is below 10
    if (selectedQuantity < 10) {
      alert("The minimum quantity to order is 10 kg.");
    }
  };

  const handleBuyNowClick = () => {
    // Alert if product quantity is less than 10
    if (product.quantity < 10) {
      alert("You cannot buy this product as it is out of stock.");
      return;
    }

    // Alert if the selected quantity is less than the minimum required
    if (quantity < 10) {
      alert("Minimum quantity is 10 kg.");
      return;
    }

    // Navigate to BuyNowFinal page, passing product and quantity
    navigate(`/buyNowFinal/${id}`, { state: { product, quantity } });
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
          style={{
            ...styles.searchBar,
            cursor: "not-allowed",
            backgroundColor: "#e9ecef",
          }}
          value={searchTerm}
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

      {/* Product Details */}
      <div style={styles.container}>
        <div style={styles.productDetails}>
          <div style={styles.productImageContainer}>
            <img
              src={`http://localhost:5000${product.productImage}`}
              alt={product.productName}
              style={styles.productImage}
            />
          </div>
          <div style={styles.productInfo}>
            <h3><strong>Name: </strong> {product.productName}</h3>
            <p><strong>Description: </strong> {product.description}</p>
            <p>
              <strong>Quantity in Kg:</strong> {product.quantity}{" "}
              <strong>Kg</strong>
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Seller Name:</strong> {product.sellerName}
            </p>

            {/* Quantity input */}
            <p>
              <strong>Select Quantity:</strong> 
            </p>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="10"
              max={product.quantity}
              disabled={product.quantity < 10} // Disable input if product is out of stock or less than 10
              style={styles.input}
            />
            <button
              style={styles.buyButton}
              onClick={handleBuyNowClick}
              disabled={product.quantity < 10} // Disable button if product is out of stock or less than 10
            >
              {product.quantity < 10 ? "Out of Stock" : "Buy Now"}
            </button>
          </div>
        </div>

        {/* Related Products */}
        <h3>Related Products</h3>
        <div style={styles.relatedProductsContainer}>
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} style={styles.relatedProductCard}>
                <img
                  src={`http://localhost:5000${relatedProduct.productImage}`}
                  alt={relatedProduct.productName}
                  style={styles.relatedProductImage}
                />
                <h4>{relatedProduct.productName}</h4>
                <p>Price: ${relatedProduct.price}</p>
                <div style={styles.relatedProductActions}>
                  {/* Buy Now button for related products */}
                  <button
                    style={styles.buyButton}
                    onClick={() => navigate(`/product/${relatedProduct._id}`)} // Navigate to BuyNowPage
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
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
    minHeight: "100vh",
  },
  productDetails: {
    display: "flex",
    justifyContent: "center", // Centering horizontally
    alignItems: "center", // Centering vertically
    flexWrap:'wrap',
    gap: "50px",
    width: "60%",
    maxWidth: "1200px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#fff",
    marginBottom: "20px",
  },
  productImageContainer: {
    // flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "300px",
    maxHeight: "300px",
    overflow: "hidden",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  productInfo: {
    // flex: "2",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
  },
  input: {
    width: "150px", // Reduce the width of the input field
    padding: "5px",
    marginTop: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  buyButton: {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    alignSelf: "flex-start",
  },
  relatedProductsContainer: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "20px",
  },
  relatedProductCard: {
    width: "calc(25% - 20px)",
    maxWidth: "250px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  relatedProductImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    marginBottom: "10px",
  },
};

export default BuyNowPage;
