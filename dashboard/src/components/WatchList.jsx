// // // import React, { useState, useContext } from "react";

// // // import axios from "axios";

// // // import GeneralContext from "./GeneralContext";

// // // import { Tooltip, Grow } from "@mui/material";

// // // import {
// // //   BarChartOutlined,
// // //   KeyboardArrowDown,
// // //   KeyboardArrowUp,
// // //   MoreHoriz,
// // // } from "@mui/icons-material";

// // // import { watchlist } from "../data/data";
// // // import { DoughnutChart } from "./DoughnoutChart";

// // // const labels = watchlist.map((subArray) => subArray["name"]);

// // // const WatchList = () => {
// // //   const data = {
// // //     labels,
// // //     datasets: [
// // //       {
// // //         label: "Price",
// // //         data: watchlist.map((stock) => stock.price),
// // //         backgroundColor: [
// // //           "rgba(255, 99, 132, 0.5)",
// // //           "rgba(54, 162, 235, 0.5)",
// // //           "rgba(255, 206, 86, 0.5)",
// // //           "rgba(75, 192, 192, 0.5)",
// // //           "rgba(153, 102, 255, 0.5)",
// // //           "rgba(255, 159, 64, 0.5)",
// // //         ],
// // //         borderColor: [
// // //           "rgba(255, 99, 132, 1)",
// // //           "rgba(54, 162, 235, 1)",
// // //           "rgba(255, 206, 86, 1)",
// // //           "rgba(75, 192, 192, 1)",
// // //           "rgba(153, 102, 255, 1)",
// // //           "rgba(255, 159, 64, 1)",
// // //         ],
// // //         borderWidth: 1,
// // //       },
// // //     ],
// // //   };

// // //   // export const data = {
// // //   //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
// // //   // datasets: [
// // //   //   {
// // //   //     label: "# of Votes",
// // //   //     data: [12, 19, 3, 5, 2, 3],
// // //   //     backgroundColor: [
// // //   //       "rgba(255, 99, 132, 0.2)",
// // //   //       "rgba(54, 162, 235, 0.2)",
// // //   //       "rgba(255, 206, 86, 0.2)",
// // //   //       "rgba(75, 192, 192, 0.2)",
// // //   //       "rgba(153, 102, 255, 0.2)",
// // //   //       "rgba(255, 159, 64, 0.2)",
// // //   //     ],
// // //   //     borderColor: [
// // //   //       "rgba(255, 99, 132, 1)",
// // //   //       "rgba(54, 162, 235, 1)",
// // //   //       "rgba(255, 206, 86, 1)",
// // //   //       "rgba(75, 192, 192, 1)",
// // //   //       "rgba(153, 102, 255, 1)",
// // //   //       "rgba(255, 159, 64, 1)",
// // //   //     ],
// // //   //     borderWidth: 1,
// // //   //   },
// // //   // ],
// // //   // };

// // //   return (
// // //     <div className="watchlist-container">
// // //       <div className="search-container">
// // //         <input
// // //           type="text"
// // //           name="search"
// // //           id="search"
// // //           placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
// // //           className="search"
// // //         />
// // //         <span className="counts"> {watchlist.length} / 50</span>
// // //       </div>

// // //       <ul className="list">
// // //         {watchlist.map((stock, index) => {
// // //           return <WatchListItem stock={stock} key={index} />;
// // //         })}
// // //       </ul>

// // //       <DoughnutChart data={data} />
// // //     </div>
// // //   );
// // // };

// // // export default WatchList;

// // // const WatchListItem = ({ stock }) => {
// // //   const [showWatchlistActions, setShowWatchlistActions] = useState(false);

// // //   const handleMouseEnter = (e) => {
// // //     setShowWatchlistActions(true);
// // //   };

// // //   const handleMouseLeave = (e) => {
// // //     setShowWatchlistActions(false);
// // //   };

// // //   return (
// // //     <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
// // //       <div className="item">
// // //         <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
// // //         <div className="itemInfo">
// // //           <span className="percent">{stock.percent}</span>
// // //           {stock.isDown ? (
// // //             <KeyboardArrowDown className="down" />
// // //           ) : (
// // //             <KeyboardArrowUp className="down" />
// // //           )}
// // //           <span className="price">{stock.price}</span>
// // //         </div>
// // //       </div>
// // //       {showWatchlistActions && <WatchListActions uid={stock.name} />}
// // //     </li>
// // //   );
// // // };

// // // const WatchListActions = ({ uid }) => {
// // //   const generalContext = useContext(GeneralContext);

// // //   const handleBuyClick = () => {
// // //     generalContext.openBuyWindow(uid);
// // //   };

// // //   return (
// // //     <span className="actions">
// // //       <span>
// // //         <Tooltip
// // //           title="Buy (B)"
// // //           placement="top"
// // //           arrow
// // //           TransitionComponent={Grow}
// // //           onClick={handleBuyClick}
// // //         >
// // //           <button className="buy">Buy</button>
// // //         </Tooltip>
// // //         <Tooltip
// // //           title="Sell (S)"
// // //           placement="top"
// // //           arrow
// // //           TransitionComponent={Grow}
// // //         >
// // //           <button className="sell">Sell</button>
// // //         </Tooltip>
// // //         <Tooltip
// // //           title="Analytics (A)"
// // //           placement="top"
// // //           arrow
// // //           TransitionComponent={Grow}
// // //         >
// // //           <button className="action">
// // //             <BarChartOutlined className="icon" />
// // //           </button>
// // //         </Tooltip>
// // //         <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
// // //           <button className="action">
// // //             <MoreHoriz className="icon" />
// // //           </button>
// // //         </Tooltip>
// // //       </span>
// // //     </span>
// // //   );
// // // };


// // import React, { useState } from "react";
// // // Import our new custom hook instead of the context directly
// // import { useGeneralContext } from "./GeneralContext";

// // import { Tooltip, Grow } from "@mui/material";
// // import {
// //   BarChartOutlined,
// //   KeyboardArrowDown,
// //   KeyboardArrowUp,
// //   MoreHoriz,
// // } from "@mui/icons-material";

// // // For now, we'll keep using the static data for the list itself.
// // // In the future, this could come from a "user_watchlist" collection in your DB.
// // import { watchlist } from "../data/data";
// // import { DoughnutChart } from "./DoughnoutChart";


// // // This component remains the same, as it's just for the chart.
// // const WatchList = () => {
// //   const labels = watchlist.map((subArray) => subArray.name);
// //   const data = {
// //     labels,
// //     datasets: [
// //       {
// //         label: "Price",
// //         data: watchlist.map((stock) => stock.price),
// //         backgroundColor: [
// //           "rgba(255, 99, 132, 0.5)","rgba(54, 162, 235, 0.5)","rgba(255, 206, 86, 0.5)",
// //           "rgba(75, 192, 192, 0.5)","rgba(153, 102, 255, 0.5)","rgba(255, 159, 64, 0.5)",
// //         ],
// //         borderColor: [
// //           "rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)",
// //           "rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)",
// //         ],
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   return (
// //     <div className="watchlist-container">
// //       <div className="search-container">
// //         <input
// //           type="text"
// //           name="search"
// //           id="search"
// //           placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
// //           className="search"
// //         />
// //         <span className="counts"> {watchlist.length} / 50</span>
// //       </div>

// //       <ul className="list">
// //         {watchlist.map((stock, index) => {
// //           // Pass the entire stock object to WatchListItem
// //           return <WatchListItem stock={stock} key={index} />;
// //         })}
// //       </ul>

// //       <DoughnutChart data={data} />
// //     </div>
// //   );
// // };

// // export default WatchList;


// // // --- UPDATED WatchListItem ---
// // // This component now passes the full stock object down to the actions.
// // const WatchListItem = ({ stock }) => {
// //   const [showWatchlistActions, setShowWatchlistActions] = useState(false);

// //   const handleMouseEnter = () => {
// //     setShowWatchlistActions(true);
// //   };

// //   const handleMouseLeave = () => {
// //     setShowWatchlistActions(false);
// //   };

// //   return (
// //     <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
// //       <div className="item">
// //         <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
// //         <div className="itemInfo">
// //           <span className="percent">{stock.percent}</span>
// //           {stock.isDown ? (
// //             <KeyboardArrowDown className="down" />
// //           ) : (
// //             <KeyboardArrowUp className="down" />
// //           )}
// //           <span className="price">{stock.price}</span>
// //         </div>
// //       </div>
// //       {/* Pass the entire stock object down */}
// //       {showWatchlistActions && <WatchListActions stock={stock} />}
// //     </li>
// //   );
// // };


// // // --- HEAVILY UPDATED WatchListActions ---
// // // This component is now much smarter and uses the upgraded context.
// // const WatchListActions = ({ stock }) => {
// //   // Use the new custom hook to get the functions from the context
// //   const { openActionWindow } = useGeneralContext();

// //   return (
// //     <span className="actions">
// //       <span>
// //         <Tooltip
// //           title="Buy (B)"
// //           placement="top"
// //           arrow
// //           TransitionComponent={Grow}
// //           // The onClick now calls the context function with the full stock object and the type 'BUY'
// //           onClick={() => openActionWindow(stock, "BUY")}
// //         >
// //           <button className="buy">Buy</button>
// //         </Tooltip>
// //         <Tooltip
// //           title="Sell (S)"
// //           placement="top"
// //           arrow
// //           TransitionComponent={Grow}
// //           // The onClick for the Sell button is now active
// //           onClick={() => openActionWindow(stock, "SELL")}
// //         >
// //           <button className="sell">Sell</button>
// //         </Tooltip>
// //         <Tooltip
// //           title="Analytics (A)"
// //           placement="top"
// //           arrow
// //           TransitionComponent={Grow}
// //         >
// //           <button className="action">
// //             <BarChartOutlined className="icon" />
// //           </button>
// //         </Tooltip>
// //         <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
// //           <button className="action">
// //             <MoreHoriz className="icon" />
// //           </button>
// //         </Tooltip>
// //       </span>
// //     </span>
// //   );
// // };


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useGeneralContext } from "./GeneralContext";
// import StockSearch from './StockSearch';
// import { Tooltip, Grow } from "@mui/material";
// import {
//   BarChartOutlined,
//   KeyboardArrowDown,
//   KeyboardArrowUp,
//   MoreHoriz,
//   DeleteOutline // Import a delete icon
// } from "@mui/icons-material";

// // DoughnutChart is no longer used here as the data is now dynamic.
// // You can re-add it later if you find a new purpose for it.
// // import { DoughnutChart } from "./DoughnoutChart";

// // We are now fetching data, so the static chart data is no longer needed.

// const WatchList = () => {
//   const [watchlistData, setWatchlistData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Function to fetch the user's watchlist from the backend
//   const fetchWatchlist = async () => {
//     try {
//       setIsLoading(true);
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/watchlist`,
//         { withCredentials: true }
//       );
      
//       // 'data' is now an array of symbols like ["IBM", "AAPL"].
//       // We'll create a temporary structure with mock price data for display.
//       // In a more advanced version, you would fetch the live price for each symbol here.
//       const formattedData = data.map(symbol => ({
//         name: symbol,
//         price: (Math.random() * 1000 + 100).toFixed(2), // Mock price
//         isDown: Math.random() < 0.5,
//         percent: `${(Math.random() * 4).toFixed(2)}%`,
//       }));

//       setWatchlistData(formattedData);
//     } catch (error) {
//       console.error("Failed to fetch watchlist", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch the watchlist when the component first loads
//   useEffect(() => {
//     fetchWatchlist();
//   }, []);

//   const handleRemoveFromWatchlist = async (symbol) => {
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/watchlist/remove`,
//         { symbol }, // The data to send
//         { withCredentials: true }
//       );
//       // After successfully removing, re-fetch the watchlist to update the UI
//       fetchWatchlist(); 
//     } catch (error) {
//       console.error("Failed to remove stock from watchlist:", error);
//       alert("Could not remove stock from watchlist.");
//     }
//   };

//   return (
//     <div className="watchlist-container">
//       <div className="search-container">
//         {/* We will replace this with the StockSearch component in the next step */}
//         <input
//           type="text"
//           name="search"
//           id="search"
//           placeholder="Search (functionality to be added)"
//           className="search"
//         />
//         <span className="counts"> {watchlistData.length} / 50</span>
//       </div>

//       {isLoading ? (
//         <p>Loading watchlist...</p>
//       ) : (
//         <ul className="list">
//           {watchlistData.map((stock, index) => (
//             <WatchListItem 
//               stock={stock} 
//               key={index} 
//               onRemove={handleRemoveFromWatchlist} 
//             />
//           ))}
//         </ul>
//       )}
      
//       {/* The DoughnutChart is removed for now as its data was static. */}
//     </div>
//   );
// };

// export default WatchList;


// // --- WatchListItem ---
// // This component now receives and passes down the 'onRemove' function.
// const WatchListItem = ({ stock, onRemove }) => {
//   const [showWatchlistActions, setShowWatchlistActions] = useState(false);

//   return (
//     <li 
//       onMouseEnter={() => setShowWatchlistActions(true)} 
//       onMouseLeave={() => setShowWatchlistActions(false)}
//     >
//       <div className="item">
//         <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
//         <div className="itemInfo">
//           <span className="percent">{stock.percent}</span>
//           {stock.isDown ? (
//             <KeyboardArrowDown className="down" />
//           ) : (
//             <KeyboardArrowUp className="up" /> // This should probably be an 'up' class for styling
//           )}
//           <span className="price">{stock.price}</span>
//         </div>
//       </div>
//       {showWatchlistActions && <WatchListActions stock={stock} onRemove={onRemove} />}
//     </li>
//   );
// };


// // --- WatchListActions ---
// // This component now has a functional "Remove" button.
// const WatchListActions = ({ stock, onRemove }) => {
//   const { openActionWindow } = useGeneralContext();

//   return (
//     <span className="actions">
//       <span>
//         <Tooltip title="Buy (B)" /* ...props... */ onClick={() => openActionWindow(stock, "BUY")}>
//           <button className="buy">Buy</button>
//         </Tooltip>
//         <Tooltip title="Sell (S)" /* ...props... */ onClick={() => openActionWindow(stock, "SELL")}>
//           <button className="sell">Sell</button>
//         </Tooltip>
//         <Tooltip title="Analytics (A)" /* ...props... */>
//           <button className="action">
//             <BarChartOutlined className="icon" />
//           </button>
//         </Tooltip>
//         {/* --- NEW/UPDATED "Remove" BUTTON --- */}
//         <Tooltip title="Remove from watchlist" placement="top" arrow TransitionComponent={Grow}>
//           <button className="action" onClick={() => onRemove(stock.name)}>
//             <DeleteOutline className="icon" />
//           </button>
//         </Tooltip>
//       </span>
//     </span>
//   );
// };

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGeneralContext } from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  DeleteOutline
} from "@mui/icons-material";

// Import the StockSearch component we are integrating
import StockSearch from './StockSearch';
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This function will be passed to StockSearch so it can trigger a refresh
  const fetchWatchlist = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/watchlist`,
        { withCredentials: true }
      );
      
      const formattedData = data.map(symbol => ({
        name: symbol,
        price: (Math.random() * 1000 + 100).toFixed(2), // Mock price
        isDown: Math.random() < 0.5,
        percent: `${(Math.random() * 4).toFixed(2)}%`,
      }));

      setWatchlistData(formattedData);
    } catch (error) {
      console.error("Failed to fetch watchlist", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch the watchlist when the component first loads
  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleRemoveFromWatchlist = async (symbol) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/watchlist/remove`,
        { symbol },
        { withCredentials: true }
      );
      fetchWatchlist(); // Re-fetch to update the UI
    } catch (error) {
      console.error("Failed to remove stock from watchlist:", error);
      alert("Could not remove stock from watchlist.");
    }
  };

  // --- 2. PREPARE DYNAMIC DATA FOR THE DOUGHNUT CHART ---
  const chartLabels = watchlistData.map(stock => stock.name);
  const chartPrices = watchlistData.map(stock => stock.price);

  const doughnutChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Stock Price",
        data: chartPrices,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#C9CBCF', '#E7E9ED', '#8D5B4C', '#D8BFD8'
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="watchlist-container">
      <StockSearch onStockAdded={fetchWatchlist} />
      <span className="counts"> {watchlistData.length} / 50</span>

      {isLoading ? (
        <p>Loading watchlist...</p>
      ) : (
        <ul className="list">
          {watchlistData.map((stock, index) => (
            <WatchListItem 
              stock={stock} 
              key={index} 
              onRemove={handleRemoveFromWatchlist} 
            />
          ))}
        </ul>
      )}
      
      {/* --- 3. RENDER THE CHART --- */}
      {/* We only render the chart if there is data to show */}
      {!isLoading && watchlistData.length > 0 && (
        <div className="watchlist-chart-container">
          <DoughnutChart data={doughnutChartData} />
        </div>
      )}
    </div>
  );
};

export default WatchList;

// --- WatchListItem (No changes needed from last time) ---
const WatchListItem = ({ stock, onRemove }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li 
      onMouseEnter={() => setShowWatchlistActions(true)} 
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions stock={stock} onRemove={onRemove} />}
    </li>
  );
};


// --- WatchListActions (No changes needed from last time) ---
const WatchListActions = ({ stock, onRemove }) => {
  const { openActionWindow } = useGeneralContext();

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" /* ... */ onClick={() => openActionWindow(stock, "BUY")}>
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip title="Sell (S)" /* ... */ onClick={() => openActionWindow(stock, "SELL")}>
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip title="Analytics (A)" /* ... */ >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="Remove from watchlist" /* ... */ >
          <button className="action" onClick={() => onRemove(stock.name)}>
            <DeleteOutline className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};