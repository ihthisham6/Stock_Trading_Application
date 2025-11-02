

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGeneralContext } from "./GeneralContext";

const Summary = () => {
    // --- STATE MANAGEMENT ---
    const { user } = useGeneralContext();
    const [holdingsData, setHoldingsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            } catch (error) {
                console.error("Failed to fetch holdings for summary", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHoldings();
    }, []);

    // --- DYNAMIC CALCULATIONS ---
    const totalInvestment = holdingsData.reduce((acc, h) => acc + (h.avg * h.qty), 0);
    const currentValue = holdingsData.reduce((acc, h) => acc + (h.price * h.qty), 0);
    const totalPandL = currentValue - totalInvestment;
    const pnlPercentage = totalInvestment === 0 ? 0 : (totalPandL / totalInvestment) * 100;
    
    // --- Define the class based on P&L ---
    const pnlClass = totalPandL >= 0 ? 'profit' : 'loss';

    const formatToK = (num) => {
        if (isLoading) return "...";
        if (Math.abs(num) > 999) {
            return (num / 1000).toFixed(2) + 'k';
        }
        return num.toFixed(2);
    };

    return (
        <>
            <div className="username">
                <h6>Hi, {user ? user.username : 'User'}!</h6>
                <hr className="divider" />
            </div>

            <div className="section">
                <span>
                    <p>Equity</p>
                </span>
                <div className="data">
                    <div className="first">
                        <h3>3.74k</h3>
                        <p>Margin available</p>
                    </div>
                    <hr />
                    <div className="second">
                        <p>Margins used <span>0</span></p>
                        <p>Opening balance <span>3.74k</span></p>
                    </div>
                </div>
                <hr className="divider" />
            </div>

            <div className="section">
                <span>
                    <p>Holdings ({isLoading ? '...' : holdingsData.length})</p>
                </span>
                <div className="data">
                    <div className="first">
                        {/* The className is applied to the h3, which will color both the amount and the percentage */}
                        <h3 className={pnlClass}>
                            {formatToK(totalPandL)}
                             <small> ({pnlPercentage.toFixed(2)}%)</small>
                        </h3>
                        <p>P&L</p>
                    </div>
                    <hr />
                    <div className="second">
                        <p>Current Value <span>{formatToK(currentValue)}</span></p>
                        <p>Investment <span>{formatToK(totalInvestment)}</span></p>
                    </div>
                </div>
                <hr className="divider" />
            </div>
        </>
    );
};

export default Summary;
                         