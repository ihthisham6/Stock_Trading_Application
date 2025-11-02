// import React, { createContext, useContext, useState,useEffect } from "react";
// import BuyActionWindow from "./BuyActionWindow";
// import axios from "axios";
// // --- 1. Create the Context ---
// // We create it once and can use it anywhere.
// const GeneralContext = createContext();

// // --- 2. Create the Provider Component ---
// export const GeneralContextProvider = ({ children }) => {
//     // State for controlling the Buy/Sell window
//     const [isActionWindowOpen, setIsActionWindowOpen] = useState(false);
//     const [selectedStock, setSelectedStock] = useState(null);
//     const [actionType, setActionType] = useState("BUY");

//     // --- NEW: State for triggering data refresh ---
//     const [refreshKey, setRefreshKey] = useState(0);

//      const [user, setUser] = useState(null);

//     // --- UPGRADED: This function now accepts the stock object and the action type ---
//     const openActionWindow = (stock, type) => {
//         setSelectedStock(stock);
//         setActionType(type);
//         setIsActionWindowOpen(true);
//     };

//     const closeActionWindow = () => {
//         setIsActionWindowOpen(false);
//         setSelectedStock(null);
//     };

//     // --- NEW: This function will be called by BuyActionWindow on success ---
//     const handleTransaction = () => {
//         console.log("Transaction successful, triggering a data refresh...");
//         setRefreshKey(oldKey => oldKey + 1);
//     };

//     // --- 3. Define the value to be shared by the context ---
//     const contextValue = {
//         openActionWindow,  // Pass the upgraded open function
//         closeActionWindow, // Pass the close function
//         refreshKey,        // Pass the refresh trigger
//     };

//     return (
//         <GeneralContext.Provider value={contextValue}>
//             {children}
//             {isActionWindowOpen && (
//                 <BuyActionWindow
//                     stock={selectedStock}
//                     type={actionType}
//                     onClose={closeActionWindow}
//                     onTransactionSuccess={handleTransaction}
//                 />
//             )}
//         </GeneralContext.Provider>
//     );
// };

// // --- 4. Create a custom hook for easily using the context ---
// // This is a best practice that makes your other components cleaner.
// export const useGeneralContext = () => {
//     return useContext(GeneralContext);
// };



import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import BuyActionWindow from "./BuyActionWindow";

// --- 1. Create the Context ---
const GeneralContext = createContext();

// --- 2. Create the Provider Component ---
export const GeneralContextProvider = ({ children }) => {
    // State for controlling the Buy/Sell window
    const [isActionWindowOpen, setIsActionWindowOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [actionType, setActionType] = useState("BUY");

    // State for triggering data refresh across components
    const [refreshKey, setRefreshKey] = useState(0);

    // --- NEW: State to hold the logged-in user's profile ---
    const [user, setUser] = useState(null);

    // --- NEW: useEffect to fetch the user profile when the app loads ---
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // This GET request is sent with the auth cookie
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/profile`,
                    { withCredentials: true }
                );
                // If successful, store the user object in state
                setUser(data);
            } catch (error) {
                console.error("Could not fetch user profile", error);
                // If the token is invalid or expired, the user state will remain null
                setUser(null);
            }
        };

        fetchUserProfile();
    }, []); // The empty dependency array ensures this runs only once.

    // --- Your existing functions ---
    const openActionWindow = (stock, type) => {
        setSelectedStock(stock);
        setActionType(type);
        setIsActionWindowOpen(true);
    };

    const closeActionWindow = () => {
        setIsActionWindowOpen(false);
        setSelectedStock(null);
    };

    const handleTransaction = () => {
        console.log("Transaction successful, triggering a data refresh...");
        setRefreshKey(oldKey => oldKey + 1);
    };

    // --- 3. Define the value to be shared by the context ---
    // All of these values will be available to any component that uses the useGeneralContext() hook.
    const contextValue = {
        openActionWindow,
        closeActionWindow,
        refreshKey,
        handleTransaction, // Pass this down so BuyActionWindow can call it
        user, // --- ADDED: Pass the user object down ---
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

// --- 4. Create the custom hook for using the context ---
export const useGeneralContext = () => {
    return useContext(GeneralContext);
};