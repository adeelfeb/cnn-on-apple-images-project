import { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is installed

const SellerDashboardid = () => {
    const [sellerId, setSellerId] = useState(null);

    useEffect(() => {
        const fetchSellerId = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/seller", {
                    withCredentials: true, // If using cookies for auth
                });
                setSellerId(response.data.sellerId);
            } catch (error) {
                console.error("Error fetching seller ID:", error);
            }
        };

        fetchSellerId();
    }, []);

    return <div>Seller Dashboard - Seller ID: {sellerId}</div>;
};

export default SellerDashboardid;
