import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Keep Link for the "Get started" button
import axios from "axios";
import { useGeneralContext } from "./GeneralContext"; // Import for auto-refresh

const Orders = () => {
  // --- STATE MANAGEMENT ---
  const { refreshKey } = useGeneralContext(); // Get the refreshKey to listen for transactions
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true); // Set loading true at the start of every fetch
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/allOrders`,
          { withCredentials: true } // Authentication is required
        );
        setOrdersData(data);
        setError(null); // Clear any previous errors on success
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Could not load your order history. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading, whether it succeeded or failed
      }
    };

    fetchOrders();
  }, [refreshKey]); // This dependency array makes the component auto-refresh

  // --- RENDER LOGIC ---

  // Display a loading message while data is being fetched
  if (isLoading) {
    return <div>Loading order history...</div>;
  }

  // Display an error message if the fetch failed
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  // If there are no orders, display the original "Get started" message
  if (ordersData.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  // If there are orders, display them in a table
  return (
    <>
      <h3 className="title">Orders ({ordersData.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Type</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                {/* Use 'profit' and 'loss' classes for color styling */}
                <td className={order.mode === 'BUY' ? 'profit' : 'loss'}>
                  {order.mode}
                </td>
                <td>{order.qty}</td>
                <td>{order.price.toFixed(2)}</td>
                {/* 
                  This extracts the timestamp embedded in every MongoDB ObjectId,
                  converts it to a Date object, and then formats it into a
                  readable local date and time string.
                */}
                <td>{new Date(parseInt(order._id.substring(0, 8), 16) * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;