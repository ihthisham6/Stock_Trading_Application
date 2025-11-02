// import React,{useState,useEffect} from "react";  
// import axios, { all } from "axios";

// //import { positions } from "../data/data";

// const Positions = () => {
//   const [allPositions, setAllPositions] = useState([]);
  
//   useEffect(() => {
//     axios.get("http://localhost:3002/allPositions").then((res) => {
//       // console.log(res.data);
//       setAllPositions(res.data);
//     });
//   }, []);
//   return (
//     <>
//       <h3 className="title">Positions ({allPositions.length})</h3>

//       <div className="order-table">
//         <table>
//           <tr>
//             <th>Product</th>
//             <th>Instrument</th>
//             <th>Qty.</th>
//             <th>Avg.</th>
//             <th>LTP</th>
//             <th>P&L</th>
//             <th>Chg.</th>
//           </tr>

//           {allPositions.map((stock, index) => {
//             const curValue = stock.price * stock.qty;
//             const isProfit = curValue - stock.avg * stock.qty >= 0.0;
//             const profClass = isProfit ? "profit" : "loss";
//             const dayClass = stock.isLoss ? "loss" : "profit";

//             return (
//               <tr key={index}>
//                 <td>{stock.product}</td>
//                 <td>{stock.name}</td>
//                 <td>{stock.qty}</td>
//                 <td>{stock.avg.toFixed(2)}</td>
//                 <td>{stock.price.toFixed(2)}</td>
//                 <td className={profClass}>
//                   {(curValue - stock.avg * stock.qty).toFixed(2)}
//                 </td>
//                 <td className={dayClass}>{stock.day}</td>
//               </tr>
//             );
//           })}
//         </table>
//       </div>
//     </>
//   );
// };

// export default Positions;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGeneralContext } from "./GeneralContext";
const Positions = () => {
  // --- STATE MANAGEMENT ---
  const { refreshKey } = useGeneralContext();
  const [positionsData, setPositionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        // *** CRITICAL FIX: Added { withCredentials: true } ***
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/allPositions`,
          { withCredentials: true }
        );
        setPositionsData(data);
      } catch (err) {
        console.error("Failed to fetch positions:", err);
        setError("Could not load your positions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPositions();
  }, [refreshKey]);

  // --- LOADING AND ERROR UI ---
  if (isLoading) {
    return <div>Loading positions...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  // --- RENDER THE COMPONENT ---
  return (
    <>
      <h3 className="title">Positions ({positionsData.length})</h3>

      <div className="order-table">
        <table>
          {/* *** HTML FIX: Added <thead> for table headers *** */}
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          {/* *** HTML FIX: Added <tbody> for table body *** */}
          <tbody>
            {positionsData.map((position) => {
              const curValue = position.price * position.qty;
              const pnl = curValue - position.avg * position.qty;
              const profClass = pnl >= 0 ? "profit" : "loss";

              // Use position._id from MongoDB for a more reliable key
              return (
                <tr key={position._id}>
                  <td>{position.product}</td>
                  <td>{position.name}</td>
                  <td>{position.qty}</td>
                  <td>{position.avg.toFixed(2)}</td>
                  <td>{position.price.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>{position.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;