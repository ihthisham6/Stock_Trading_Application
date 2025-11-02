// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import axios from "axios";

// import GeneralContext from "./GeneralContext";

// import "./BuyActionWindow.css";

// const BuyActionWindow = ({ uid }) => {
//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPrice, setStockPrice] = useState(0.0);

//   const handleBuyClick = () => {
//     axios.post("http://localhost:3002/newOrder", {
//       name: uid,
//       qty: stockQuantity,
//       price: stockPrice,
//       mode: "BUY",
//     },
//     { withCredentials: true }
//   );

//     GeneralContext.closeBuyWindow();
//   };

//   const handleCancelClick = () => {
//     GeneralContext.closeBuyWindow();
//   };

//   return (
//     <div className="container" id="buy-window" draggable="true">
//       <div className="regular-order">
//         <div className="inputs">
//           <fieldset>
//             <legend>Qty.</legend>
//             <input
//               type="number"
//               name="qty"
//               id="qty"
//               onChange={(e) => setStockQuantity(e.target.value)}
//               value={stockQuantity}
//             />
//           </fieldset>
//           <fieldset>
//             <legend>Price</legend>
//             <input
//               type="number"
//               name="price"
//               id="price"
//               step="0.05"
//               onChange={(e) => setStockPrice(e.target.value)}
//               value={stockPrice}
//             />
//           </fieldset>
//         </div>
//       </div>

//       <div className="buttons">
//         <span>Margin required ₹140.65</span>
//         <div>
//           <Link className="btn btn-blue" onClick={handleBuyClick}>
//             Buy
//           </Link>
//           <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyActionWindow;


import React, { useState, useEffect } from "react";
import axios from "axios";
// The Link component is not ideal for buttons that perform actions.
// We'll use a standard <button> for better accessibility and event handling.
// import { Link } from "react-router-dom"; 
import "./BuyActionWindow.css";

// --- UPDATED: Component now receives new props passed from the context ---
const BuyActionWindow = ({ stock, type, onClose, onTransactionSuccess }) => {
    // State for the form inputs
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0.0);

    // --- NEW: A useEffect to set the initial price ---
    // This runs when the component opens, setting the price from the watchlist.
    useEffect(() => {
        if (stock) {
            setStockPrice(stock.price || 0.0);
        }
    }, [stock]); // Dependency: Re-run if the stock object changes

    // --- UPGRADED: The main submit handler for both Buy and Sell ---
    const handleSubmit = async () => {
        // Basic validation
        if (stockQuantity <= 0) {
            alert("Quantity must be greater than zero.");
            return;
        }

        const orderDetails = {
            name: stock.name,
            qty: parseInt(stockQuantity),
            price: parseFloat(stockPrice),
        };

        try {
            let response;
            if (type === "BUY") {
                response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/newOrder`,
                    { ...orderDetails, mode: "BUY" },
                    { withCredentials: true }
                );
            } else { // It must be a "SELL" order
                response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/sellOrder`,
                    { name: stock.name, qty: parseInt(stockQuantity) }, // Sell route only needs name and qty
                    { withCredentials: true }
                );
            }

            alert(response.data.message); // Show success message from backend
            onTransactionSuccess(); // Trigger the refresh in Holdings/Positions
            onClose(); // Close this modal window

        } catch (error) {
            console.error(`Failed to execute ${type} order:`, error);
            // Show the specific, helpful error message from the backend if it exists
            const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
            alert(errorMessage);
        }
    };
    
    // The handleCancelClick now correctly uses the onClose prop
    const handleCancelClick = () => {
        onClose();
    };

    // Make sure we don't render anything if there's no stock selected
    if (!stock) {
        return null;
    }

    return (
        <div className="container" id="buy-window">
            <div className="regular-order">
                {/* Dynamically change the title based on the 'type' prop */}
                <h3>{type} {stock.name}</h3>

                <div className="inputs">
                    <fieldset>
                        <legend>Qty.</legend>
                        <input
                            type="number"
                            name="qty"
                            id="qty"
                            onChange={(e) => setStockQuantity(e.target.value)}
                            value={stockQuantity}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Price</legend>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            step="0.05"
                            onChange={(e) => setStockPrice(e.target.value)}
                            value={stockPrice}
                            // The price input is not needed for a 'SELL' order
                            disabled={type === "SELL"}
                        />
                    </fieldset>
                </div>
            </div>

            <div className="buttons">
                <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
                <div>
                    {/* Use standard <button> for actions */}
                    <button className="btn btn-blue" onClick={handleSubmit}>
                        {type}
                    </button>
                    <button className="btn btn-grey" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyActionWindow;