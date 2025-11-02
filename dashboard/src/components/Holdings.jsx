
// import React, { useState, useEffect } from "react";
// import axios from "axios"; // 'all' is not needed here
// import { VerticalGraph } from "./VerticalGraph";
// import { useGeneralContext } from "./GeneralContext";

// const Holdings = () => {
//   // --- STATE MANAGEMENT ---
//   // Use more descriptive names for state
//     const { refreshKey } = useGeneralContext();
//   const [holdingsData, setHoldingsData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // --- DATA FETCHING ---
//   useEffect(() => {
//     // Define an async function inside useEffect to fetch data
//     const fetchHoldings = async () => {
//       try {
//         // Use your Vite environment variable for the URL
//         // *** CRITICAL FIX: Added { withCredentials: true } ***
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL}/allHoldings`,
//           { withCredentials: true }
//         );
//         setHoldingsData(data); // Set the fetched data
//       } catch (err) {
//         console.error("Failed to fetch holdings:", err); // Log the detailed error
//         setError("Could not load your holdings. Please try again later."); // Set a user-friendly error message
//       } finally {
//         setIsLoading(false); // This runs whether the fetch succeeded or failed
//       }
//     };

//     fetchHoldings();
//   }, [refreshKey]); // The empty dependency array means this runs only once on mount

//   // --- LOADING AND ERROR UI ---
//   // Show a loading message while the API call is in progress
//   if (isLoading) {
//     return <div>Loading holdings...</div>;
//   }

//   // Show an error message if the API call failed
//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }


  

//   // --- CHART DATA PREPARATION ---
//   // This logic now runs only after holdingsData has been successfully fetched
//   const labels = holdingsData.map((subArray) => subArray.name);
//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: "Stock Price",
//         data: holdingsData.map((stock) => stock.price),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//     ],
//   };

//   // --- RENDER THE COMPONENT ---
//   return (
//     <>
//       <h3 className="title">Holdings ({holdingsData.length})</h3>

//       <div className="order-table">
//         <table>
//           {/* *** HTML FIX: Added <thead> for table headers *** */}
//           <thead>
//             <tr>
//               <th>Instrument</th>
//               <th>Qty.</th>
//               <th>Avg. cost</th>
//               <th>LTP</th>
//               <th>Cur. val</th>
//               <th>P&L</th>
//               <th>Net chg.</th>
//               <th>Day chg.</th>
//             </tr>
//           </thead>
          
//           {/* *** HTML FIX: Added <tbody> for table body *** */}
//           <tbody>
//             {holdingsData.map((stock, index) => {
//               const curValue = stock.price * stock.qty;
//               const isProfit = curValue - stock.avg * stock.qty >= 0.0;
//               const profClass = isProfit ? "profit" : "loss";
//               const dayClass = stock.isLoss ? "loss" : "profit";

//               // Use stock._id from MongoDB for a more reliable key
//               return (
//                 <tr key={stock._id || index}>
//                   <td>{stock.name}</td>
//                   <td>{stock.qty}</td>
//                   <td>{stock.avg.toFixed(2)}</td>
//                   <td>{stock.price.toFixed(2)}</td>
//                   <td>{curValue.toFixed(2)}</td>
//                   <td className={profClass}>
//                     {(curValue - stock.avg * stock.qty).toFixed(2)}
//                   </td>
//                   <td className={profClass}>{stock.net}</td>
//                   <td className={dayClass}>{stock.day}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <div className="row">
//         {/* These values are currently hardcoded, you can calculate them later */}
//         <div className="col">
//           <h5>29,875.<span>55</span></h5>
//           <p>Total investment</p>
//         </div>
//         <div className="col">
//           <h5>31,428.<span>95</span></h5>
//           <p>Current value</p>
//         </div>
//         <div className="col">
//           <h5>1,553.40 (+5.20%)</h5>
//           <p>P&L</p>
//         </div>
//       </div>
//       <div className="vertical-graph-container">
//       <VerticalGraph data={chartData} />
//       </div>
//     </>
//   );
// };

// export default Holdings;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { useGeneralContext } from "./GeneralContext";

const Holdings = () => {
  // --- STATE MANAGEMENT ---
  const { refreshKey } = useGeneralContext();
  const [holdingsData, setHoldingsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchHoldings = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/allHoldings`,
          { withCredentials: true }
        );
        setHoldingsData(data);
      } catch (err) {
        console.error("Failed to fetch holdings:", err);
        setError("Could not load your holdings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoldings();
  }, [refreshKey]);

  // --- LOADING AND ERROR UI ---
  if (isLoading) {
    return <div>Loading holdings...</div>;
  }
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  // --- DYNAMIC CALCULATIONS (THE MAIN CHANGE) ---
  // This logic runs on every render after data is fetched.
  const totalInvestment = holdingsData.reduce((acc, holding) => acc + (holding.avg * holding.qty), 0);
  const currentValue = holdingsData.reduce((acc, holding) => acc + (holding.price * holding.qty), 0);
  const totalPandL = currentValue - totalInvestment;
  const pnlPercentage = totalInvestment === 0 ? 0 : (totalPandL / totalInvestment) * 100;
  const pnlClass = totalPandL >= 0 ? 'profit' : 'loss'; // For color styling

  // A helper to format numbers into a currency string (e.g., ₹1,23,456.78)
  const formatCurrency = (number) => {
    // Using 'en-IN' locale for Indian Rupee formatting
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  // --- CHART DATA PREPARATION ---
  const labels = holdingsData.map((subArray) => subArray.name);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Current Value", // More descriptive label
        data: holdingsData.map((stock) => stock.price * stock.qty),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // --- RENDER THE COMPONENT ---
  return (
    <>
      <h3 className="title">Holdings ({holdingsData.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdingsData.map((stock) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - stock.avg * stock.qty;
              const profClass = pnl >= 0.0 ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- THIS IS THE UPDATED SECTION --- */}
      <div className="row">
        <div className="col">
          {/* Display the calculated total investment */}
          <h5>{formatCurrency(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          {/* Display the calculated current value */}
          <h5>{formatCurrency(currentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          {/* Display the calculated P&L and percentage, with dynamic class for color */}
          <h5 className={pnlClass}>
            {formatCurrency(totalPandL)} ({pnlPercentage.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      
      <div className="vertical-graph-container">
        <VerticalGraph data={chartData} />
      </div>
    </>
  );
};

export default Holdings;