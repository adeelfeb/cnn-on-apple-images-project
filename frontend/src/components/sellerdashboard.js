import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css';

const SellerDashboard = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bids, setBids] = useState([]);
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productIdError, setProductIdError] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const [showAuctionForm, setShowAuctionForm] = useState(false);
  const [auctionStartTime, setAuctionStartTime] = useState('');
  const [auctionEndTime, setAuctionEndTime] = useState('');
  const [auctionStartPrice, setAuctionStartPrice] = useState('');
  const [selectedProductForAuction, setSelectedProductForAuction] = useState(null);
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/seller/products/${user.name}`);
          setProducts(response.data.products || []);
        } catch (error) {
          setError('Error fetching products.');
        } finally {
          setLoading(false);
        }
      };

      const fetchOrders = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/orders/seller/${user.name}`);
          setOrders(response.data.orders || []);
        } catch (error) {
          setError('');
        } finally {
          setLoading(false);
        }
      };

      const fetchBids = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/bids/seller/${user.name}`);
          setBids(response.data.bids || []);
        } catch (error) {
          setError('Error fetching bids.');
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
      fetchOrders();
      fetchBids();
    }
  }, [user]);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productImage) {
      setError('Product image is required.');
      return;
    }

    const hasTwoAlphabets = (productId.match(/[A-Za-z]/g) || []).length >= 2;
    const hasTwoNumbers = (productId.match(/\d/g) || []).length >= 2;
  
    if (!hasTwoAlphabets || !hasTwoNumbers) {
      setProductIdError('Product ID must contain at least 2 alphabets and 2 numbers.');
      return;
    }

    const formData = new FormData();
    formData.append('sellerName', user.name);
    formData.append('productName', productName);
    formData.append('productId', productId); // ✔ Sending correctly
    formData.append('price', productPrice);
    formData.append('description', productDescription);
    formData.append('quantity', quantity);
    formData.append('productImage', productImage);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/seller/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newProduct = response.data.product;
      if (newProduct) {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      }

      setProductName('');
      setProductId('');
      setProductPrice('');
      setProductDescription('');
      setQuantity('');
      setProductImage(null);
    } catch (error) {
      setError('Error adding product.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setProductName(product.productName);
    setProductPrice(product.price);
    setProductDescription(product.description);
    setQuantity(product.quantity);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      productName,
      price: productPrice,
      description: productDescription,
      quantity,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`/api/seller/product/${editProduct._id}`, updatedProduct);
      const updated = response.data.product;

      if (updated) {
        setProducts((prevProducts) =>
          prevProducts.map((prod) => (prod._id === updated._id ? updated : prod))
        );
        setEditProduct(null);
      }
    } catch (error) {
      setError('Error updating product.');
    } finally {
      setLoading(false);
    }
  };

  const handleAuctionClick = (product) => {
    setSelectedProductForAuction(product);
    setShowAuctionForm(true);
  };

  

  const [auctionData, setAuctionData] = useState({
    productId: '',
    startTime: '',
    endTime: '',
    price: '',
    quantity: '',
    location: '',
    phoneNumber: '',
    link: '' 
});

const handleChangeauction = (e) => {
    setAuctionData({ ...auctionData, [e.target.name]: e.target.value });
};

const handleSubmitauction = async (e) => {
    e.preventDefault();
    
    console.log('Auction Data:', auctionData);

    try {
      const response = await axios.post("http://localhost:5000/api/auctions", auctionData)
        alert('Auction created successfully!');
    } catch (error) {
        console.error('Error creating auction:', error);
    }
};

// const [auctionData, setAuctionData] = useState({
//   productId: '',
//   startTime: '',
//   endTime: '',
//   price: '',
//   quantity: '',
//   location: '',
//   phoneNumber: '',
//   image: null,  // Add image field
// });


// const handleAuctionClick = (product) => {
//   setSelectedProductForAuction(product);
//   setShowAuctionForm(true);
// };

// const handleChangeauction = (e) => {
//   setAuctionData({ ...auctionData, [e.target.name]: e.target.value });
// };

// const handleImageChange = (e) => {
//   setAuctionData({ ...auctionData, image: e.target.files[0] });
// };

// const handleSubmitauction = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   const formData = new FormData();
//   formData.append('productId', auctionData.productId);
//   formData.append('startTime', auctionData.startTime);
//   formData.append('endTime', auctionData.endTime);
//   formData.append('price', auctionData.price);
//   formData.append('quantity', auctionData.quantity);
//   formData.append('location', auctionData.location);
//   formData.append('phoneNumber', auctionData.phoneNumber);
//   formData.append('image', auctionData.image); // Append image

//   try {
//     await axios.post("http://localhost:5000/api/auctions", formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     alert('Auction created successfully!');
//     setShowAuctionForm(false);
//   } catch (error) {
//     console.error('Error creating auction:', error);
//   } finally {
//     setLoading(false);
//   }
// };


  if (!user) {
    return <div>Please log in to view the seller dashboard.</div>;
  }


  

  return (
    <div>
      {/* ... (Navbar and Seller Info sections) */}


      {/* Navbar */}
       <nav style={styles.navbar}>
         <div style={styles.logo} onClick={() => navigate("/")}>
           MyShop
        </div>
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

       {/* Seller Info Section */}
       <div style={styles.sellerInfo}>
         <img src={user.image} alt={user.name} style={styles.sellerImage} />
         <h1>Welcome, {user.name}</h1>
       </div>


             {/* Products Section */}
       <h2> Your Products</h2>
       {loading && <p>Loading...</p>}
       {error && <p style={{ color: 'red' }}>{error}</p>}
       <div style={styles.productsContainer}>
         {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          products.map((product) => (
            <div style={styles.productCard} key={product._id}>
              <img
                src={product.productImage}
                alt={product.productName}
                style={styles.productImage}
              />
              <div style={styles.productDetails}>
                <h3>{product.productName}</h3>
                <h3>{product.productId}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity} kg</p>
                <button style={styles.editButton} onClick={() => handleEditClick(product)}>Edit Product</button>
                <button style={styles.auctionButton} onClick={() => handleAuctionClick(product)}>
                Create Auction
              </button>

              <button 
                style={styles.auctionButton}
                onClick={() => navigate(`/product/${product._id}`)} // Navigate to BuyNowPage with productId
              >
                View Details of Product
              </button>

              </div>
            </div>
          ))
        )}
      </div>


      {/* ... (Orders Section) */}

           <h2>Your Orders</h2>
       <div style={styles.ordersContainer}>
         {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div style={styles.orderCard} key={order._id}>
              <h4>{order.productName}</h4>
              <p>Buyer: {order.buyerName}</p>
              <p>Phone: {order.buyerPhone}</p>
              <p>Address: {order.buyerAddress}</p>
              <p>Quantity: {order.quantity} kg</p>
              <p>Price: ${order.price}</p>
              <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>

      {/* ... (Add New Product Form) */}

             {/* Add Product Form */}
       <h2>Add New Product</h2>
       <form onSubmit={handleProductSubmit} style={styles.form}>
         <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          style={styles.input}
        />

<input
          type="text"
          placeholder="Product Id"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
          style={styles.input}
        />
{productIdError && <p style={{ color: 'red', marginTop: '-10px' }}>{productIdError}</p>}

        <input
          type="number"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
          style={styles.textarea}
        />
        <input
          type="file"
          onChange={(e) => setProductImage(e.target.files[0])}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Quantity in kg"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.submitButton}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>


      {/* ... (Edit Product Modal) */}

             {editProduct && (
        <div style={modalStyles}>
          <h3>Edit Product</h3>
          <form onSubmit={handleEditSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
              style={styles.input}
            />
            <textarea
              placeholder="Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              style={styles.textarea}
            />
            <input
              type="number"
              placeholder="Quantity in kg"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" disabled={loading} style={styles.submitButton}>
              {loading ? 'Updating Product...' : 'Update Product'}
            </button>
            <button type="button" onClick={() => setEditProduct(null)} style={styles.cancelButton}>
              Cancel
            </button>
          </form>
        </div>
      )}

     {/* </div> */}


     {showAuctionForm && (
     
          <div style={modalStyles}>
           <h3>Create Auction for {selectedProductForAuction?.productName}</h3>
           <form onSubmit={handleSubmitauction} style={styles.form}>
             <input
              type="text"
              placeholder="Product Id"
              name="productId"
              // value={auctionStartTime}
              onChange={handleChangeauction}
              required
              style={styles.input}
            />
            <input
              type="datetime-local"
              placeholder="Start Time"
              name="startTime"
              // value={auctionEndTime}
              onChange={handleChangeauction}
              required
              style={styles.input}
            />
            <input
              type="datetime-local"
              placeholder="endtime"
              name="endTime"
              // value={auctionStartPrice}
              onChange={handleChangeauction}
              required
              style={styles.input}
            />

            <input
              type="number"
              placeholder="Price"
              name="price"
              // value={auctionStartPrice}
              onChange={handleChangeauction}
              required
              style={styles.input}
            />  

 <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              // value={auctionStartPrice}
              onChange={handleChangeauction}
              required
              style={styles.input}
            />  


 <input
              type="text"
              placeholder="Location"
              name="location"
              // value={auctionStartPrice}
              onChange={handleChangeauction}
              required
              style={styles.input}
            />  

 <input
              type="tel"
              placeholder="Phone Number"
              name="phoneNumber"
              // value={auctionStartPrice}
              onChange={handleChangeauction}
              required
              style={styles.input}
            />  

<input
  type="url"
  placeholder="Product Link (e.g., YouTube or external page)"
  name="link"
  // value={auctionData.link}
  onChange={handleChangeauction}
  required
  style={styles.input}
/>


            <button type="submit" disabled={loading} style={styles.submitButton}>
              {loading ? 'Creating Auction...' : 'Create Auction'}
            </button>
            <button type="button" onClick={() => setShowAuctionForm(false)} style={styles.cancelButton}>
              Cancel
            </button>
          </form>
        </div>
  )}

{/* {showAuctionForm && (
        <div style={modalStyles}>
          <h3>Create Auction for {selectedProductForAuction?.productName}</h3>
          <form onSubmit={handleSubmitauction} style={styles.form}>
            <input type="text" placeholder="Product Id" name="productId" onChange={handleChangeauction} required style={styles.input} />
            <input type="datetime-local" placeholder="Start Time" name="startTime" onChange={handleChangeauction} required style={styles.input} />
            <input type="datetime-local" placeholder="End Time" name="endTime" onChange={handleChangeauction} required style={styles.input} />
            <input type="number" placeholder="Price" name="price" onChange={handleChangeauction} required style={styles.input} />
            <input type="number" placeholder="Quantity" name="quantity" onChange={handleChangeauction} required style={styles.input} />
            <input type="text" placeholder="Location" name="location" onChange={handleChangeauction} required style={styles.input} />
            <input type="tel" placeholder="Phone Number" name="phoneNumber" onChange={handleChangeauction} required style={styles.input} />

            <input type="file" accept="image/*" onChange={handleImageChange} required style={styles.input} />

            <button type="submit" disabled={loading} style={styles.submitButton}>
              {loading ? 'Creating Auction...' : 'Create Auction'}
            </button>
            <button type="button" onClick={() => setShowAuctionForm(false)} style={styles.cancelButton}>
              Cancel
            </button>
          </form>
        </div>
      )} */}


<div>
      <h2>Your Bids</h2>
      <div style={styles.bidsContainer}>
        {bids.length === 0 ? (
          <p>No bids yet.</p>
        ) : (
          bids.map((bid) => (
            <div style={styles.bidCard} key={bid._id}>
              <h4>Product: {bid.productName}</h4>
              <p>Bidder: {bid.bidderName}</p>
              <p>Bid Amount: ${bid.bidAmount}</p>
              <p>Bid Time: {new Date(bid.bidTime).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
</div>
    
  );
};





const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  borderRadius: '8px',
};

const styles = {
  navbar: {
    backgroundColor: '#f8f9fa',
    padding: '10px 20px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'black',
  },
  navButtons: {
    display: 'flex',
  },
  navButton: {
    padding: '10px 15px',
    marginLeft: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  sellerInfo: {
    textAlign: 'center',
    margin: '20px 0',
  },
  sellerImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '15px',
  },
  productsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  productCard: {
    backgroundColor: '#f9f9f9',
    width: '250px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
  },
  productImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  productDetails: {
    marginTop: '10px',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginRight: '10px', // Space between buttons
  },
  auctionButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
  },
  ordersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '30px',
  },
  orderCard: {
    backgroundColor: '#f9f9f9',
    width: '250px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '100px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: 'black',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};


export default SellerDashboard;















//  now this auction of product is saving in mongodb , now how a seller , who wants to  sell his product by auction  ,and he create auction of his product 