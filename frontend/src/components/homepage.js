import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [searchTerm, setSearchTerm] = useState(''); // State for search functionality
  const navigate = useNavigate();

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Fetch products
        setProducts(response.data.products); // Set products in state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate('/')}>MyShop</div>
        <input
          type="text"
          placeholder="Search products..."
          style={styles.searchBar}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={styles.navButtons}>
          <button style={styles.navButton} onClick={() => navigate('/login')}>
            Login
          </button>
          <button style={styles.navButton} onClick={() => navigate('/signup')}>
            Signup
          </button>
          <button style={styles.navButton} onClick={() => navigate("/auctiondisplay")}>
            Live Auctions
          </button>
        </div>
      </nav>

      {/* Products Section */}
      <div style={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <img
                src={`http://localhost:5000${product.productImage}`}
                alt={product.productName}
                style={styles.productImage}
              />
              <h3>{product.productName}</h3>
              <p>{product.description}</p>
              <p>{product.productId}</p>
              <p>Price: ${product.price}</p>
              <p>Seller: {product.sellerName}</p>
              <button 
                style={styles.buyButton}
                onClick={() => navigate(`/product/${product._id}`)} // Navigate to BuyNowPage with productId
              >
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  searchBar: {
    flex: 1,
    margin: '0 20px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
  },
  navButton: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  buyButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default HomePage;
