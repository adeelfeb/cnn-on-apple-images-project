
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const DisplayAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const [bidData, setBidData] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // State for search functionality
  const navigate = useNavigate();

  const calculateTimeLeft = (endTime) => {
    const difference = new Date(endTime) - new Date();
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
  
    return timeLeft;
  };


  const [countdowns, setCountdowns] = useState({});

useEffect(() => {
  const interval = setInterval(() => {
    const updatedCountdowns = {};
    auctions.forEach((auction) => {
      updatedCountdowns[auction._id] = calculateTimeLeft(auction.endTime);
    });
    setCountdowns(updatedCountdowns);
  }, 1000);

  return () => clearInterval(interval);
}, [auctions]);



  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auctions");
      const currentTime = new Date();

      const activeAuctions = response.data.filter(
        (auction) => new Date(auction.endTime) > currentTime
      );

      // For each auction, fetch product details and attach
      const auctionsWithProducts = await Promise.all(
        activeAuctions.map(async (auction) => {
          try {
            const productRes = await axios.get(
              `http://localhost:5000/api/products/${auction.productId}`
            );
            return { ...auction, product: productRes.data };
          } catch (err) {
            console.error("Error fetching product:", err);
            return { ...auction, product: null };
          }
        })
      );

      setAuctions(auctionsWithProducts);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  const handleInputChange = (e, auctionId) => {
    setBidData({
      ...bidData,
      [auctionId]: {
        ...bidData[auctionId],
        [e.target.name]: e.target.value,
      },
    });
  };

  const submitBid = async (auctionId) => {
    const bidInfo = bidData[auctionId];
    if (!bidInfo?.name || !bidInfo?.phone || !bidInfo?.location || !bidInfo?.maxBid) {
      alert("Please fill out all bid details.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/auctions/${auctionId}/bid`, bidInfo);
      alert("Bid placed successfully!");
      fetchAuctions();
      setBidData({ ...bidData, [auctionId]: {} });
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  return (
    <div>

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
      <h2>Active Auctions</h2>
      {auctions.length === 0 && <p>No active auctions available.</p>}

      {auctions.map((auction) => (
        <div
          key={auction._id}
          // style={{
          //   border: "1px solid #ddd",
          //   padding: "15px",
          //   marginBottom: "20px",
          //   borderRadius: "8px",
          //   backgroundColor: "#f9f9f9",
          // }}
          style={styles.auctionCard}
        >

          <hr />

          <p style={styles.auctionInfo}><strong>Name of product:</strong> {auction.productId}</p>
          <p><strong>Start Time:</strong> {new Date(auction.startTime).toLocaleString()}</p>
          <p><strong>End Time:</strong> {new Date(auction.endTime).toLocaleString()}</p>
          {countdowns[auction._id] && (
  <p>
    <strong>Time Left:</strong>{" "}
    {`${countdowns[auction._id].hours}h ${countdowns[auction._id].minutes}m ${countdowns[auction._id].seconds}s`}
  </p>
)}
          <p><strong>Auction Price:</strong> ${auction.price}</p>
          <p><strong>Quantity:</strong> {auction.quantity}</p>
          <p><strong>Location:</strong> {auction.location}</p>
          <p><strong>Phone Number:</strong> {auction.phoneNumber}</p>
          <a href={auction.link} target="_blank" rel="noopener noreferrer">View Product Details</a>

        {auction.bids && auction.bids.length > 0 && (
  <p><strong>Highest Bid:</strong> ${Math.max(...auction.bids.map(bid => bid.maxBid))}</p>
)}

          <h4>Place a Bid:</h4>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            style={styles.input}
            value={bidData[auction._id]?.name || ""}
            onChange={(e) => handleInputChange(e, auction._id)}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            style={styles.input}
            value={bidData[auction._id]?.phone || ""}
            onChange={(e) => handleInputChange(e, auction._id)}
          />
          <input
            type="text"
            name="location"
            placeholder="Your Location"
            style={styles.input}
            value={bidData[auction._id]?.location || ""}
            onChange={(e) => handleInputChange(e, auction._id)}
          />
          <input
            type="number"
            name="maxBid"
            placeholder="Your Maximum Bid"
            style={styles.input}  
            value={bidData[auction._id]?.maxBid || ""}
            onChange={(e) => handleInputChange(e, auction._id)}
          />
          <button onClick={() => submitBid(auction._id)} style={styles.submitButton}>Submit Bid</button>

          {auction.bids && auction.bids.length > 0 && (
            <div>
              <h4>Bids Received:</h4>
              {auction.bids.map((bid, index) => (
                <div key={index} style={{ borderTop: "1px solid #ccc", paddingTop: "5px" }}>
                  <p><strong>Name:</strong> {bid.name}</p>
                  <p><strong>Phone:</strong> {bid.phone}</p>
                  <p><strong>Location:</strong> {bid.location}</p>
                  <p><strong>Bid Amount:</strong> ${bid.maxBid}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#343a40',
    color: '#fff',
    borderBottom: '2px solid #dee2e6',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#ffffff',
  },
  searchBar: {
    flex: 1,
    margin: '0 20px',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ced4da',
    fontSize: '16px',
  },
  navButtons: {
    display: 'flex',
    gap: '12px',
  },
  navButton: {
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },

  auctionCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '25px',
    marginBottom: '30px',
    maxWidth: '700px',
    margin: '30px auto',
  },
  auctionInfo: {
    fontSize: '16px',
    margin: '10px 0',
    color: '#333',
  },
  bidForm: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  bidsContainer: {
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '1px solid #ddd',
  },
  bidItem: {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '6px',
  },
};



export default DisplayAuction;






