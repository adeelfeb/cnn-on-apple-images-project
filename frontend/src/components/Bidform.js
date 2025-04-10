// Frontend - BidForm.js
import { useState } from "react";
import axios from "axios";

const BidForm = ({ auctionId, userId }) => {
  const [amount, setAmount] = useState("");
  
  const placeBid = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/place-bid", { auctionId, userId, amount });
      alert("Bid placed successfully");
    } catch (error) {
      console.error("Error placing bid", error);
    }
  };

  return (
    <form onSubmit={placeBid}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter bid amount" required />
      <button type="submit">Place Bid</button>
    </form>
  );
};

export default BidForm;