// import React, { createContext, useContext, useState } from "react";

// import BuyActionWindow from "./BuyActionWindow";

// const GeneralContext = React.createContext({
//   openBuyWindow: (uid) => {},
//   closeBuyWindow: () => {},
// });

// export const GeneralContextProvider = (props) => {
//   const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
//   const [selectedStockUID, setSelectedStockUID] = useState("");

//   const handleOpenBuyWindow = (uid) => {
//     setIsBuyWindowOpen(true);
//     setSelectedStockUID(uid);
//   };

//   const handleCloseBuyWindow = () => {
//     setIsBuyWindowOpen(false);
//     setSelectedStockUID("");
//   };

//   return (
//     <GeneralContext.Provider
//       value={{
//         openBuyWindow: handleOpenBuyWindow,
//         closeBuyWindow: handleCloseBuyWindow,
//       }}
//     >
//       {props.children}
//       {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
//     </GeneralContext.Provider>
//   );
// };

// export default GeneralContext;


import React, { createContext, useContext, useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

// --- 1. Create the Context ---
// We create it once and can use it anywhere.
const GeneralContext = createContext();

// --- 2. Create the Provider Component ---
export const GeneralContextProvider = ({ children }) => {
    // State for controlling the Buy/Sell window
    const [isActionWindowOpen, setIsActionWindowOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [actionType, setActionType] = useState("BUY");

    // --- NEW: State for triggering data refresh ---
    const [refreshKey, setRefreshKey] = useState(0);

    // --- UPGRADED: This function now accepts the stock object and the action type ---
    const openActionWindow = (stock, type) => {
        setSelectedStock(stock);
        setActionType(type);
        setIsActionWindowOpen(true);
    };

    const closeActionWindow = () => {
        setIsActionWindowOpen(false);
        setSelectedStock(null);
    };

    // --- NEW: This function will be called by BuyActionWindow on success ---
    const handleTransaction = () => {
        console.log("Transaction successful, triggering a data refresh...");
        setRefreshKey(oldKey => oldKey + 1);
    };

    // --- 3. Define the value to be shared by the context ---
    const contextValue = {
        openActionWindow,  // Pass the upgraded open function
        closeActionWindow, // Pass the close function
        refreshKey,        // Pass the refresh trigger
    };

    return (
        <GeneralContext.Provider value={contextValue}>
            {children}
            {isActionWindowOpen && (
                <BuyActionWindow
                    stock={selectedStock}
                    type={actionType}
                    onClose={closeActionWindow}
                    onTransactionSuccess={handleTransaction}
                />
            )}
        </GeneralContext.Provider>
    );
};

// --- 4. Create a custom hook for easily using the context ---
// This is a best practice that makes your other components cleaner.
export const useGeneralContext = () => {
    return useContext(GeneralContext);
};