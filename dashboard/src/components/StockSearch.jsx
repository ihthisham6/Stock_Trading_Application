// dashboard/src/components/StockSearch.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Accept the onStockAdded function as a prop
const StockSearch = ({ onStockAdded }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // This useEffect will run when the user stops typing
    useEffect(() => {
        // Don't search if the term is too short
        if (searchTerm.length < 2) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        // Set a timer to wait for the user to stop typing
        const delayDebounceFn = setTimeout(() => {
            const searchStocks = async () => {
                try {
                    const { data } = await axios.get(
                        `${import.meta.env.VITE_API_URL}/stock-search/${searchTerm}`,
                        { withCredentials: true }
                    );
                    setResults(data || []);
                } catch (error) {
                    console.error("Search failed", error);
                    setResults([]);
                } finally {
                    setIsLoading(false);
                }
            };
            searchStocks();
        }, 500); // Wait 500ms after the last keystroke

        // Cleanup function to cancel the timer if the user types again
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]); // This effect depends only on the searchTerm

    const handleAddStock = async (symbol) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/watchlist/add`,
                { symbol },
                { withCredentials: true }
            );
            onStockAdded(); // Tell the parent to refresh
            setSearchTerm(""); // Clear the search bar
            setResults([]);    // Clear the results
        } catch (error) {
            console.error("Failed to add stock", error);
            alert("Could not add stock to watchlist.");
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                // Directly update the searchTerm state on every change
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stocks to add (e.g., INFY.BSE)"
                className="search"
            />
            {isLoading && <div className="search-loading">Searching...</div>}
            {results.length > 0 && (
                <ul className="search-results">
                    {results.map(stock => (
                        <li key={stock['1. symbol']} onClick={() => handleAddStock(stock['1. symbol'])}>
                            <strong>{stock['1. symbol']}</strong> - {stock['2. name']}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StockSearch;