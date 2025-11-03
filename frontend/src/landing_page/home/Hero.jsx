import React from 'react';

function Hero() {
    return (
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <img src='media/images/homeHero.png' alt='Hero' className='mb-5'/>
            
                <h1 className='mt-5'>Invest In Everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds, and more</p>
                
                {/* --- THIS IS THE CHANGE --- */}
                {/* We use an <a> tag for the external link and style it like a button */}
                <a 
                    href={`${import.meta.env.VITE_DASHBOARD_URL}/signup`} 
                    className='p-2 btn btn-primary fs-5' 
                    style={{width:"20%", margin:"0 auto"}}
                >
                    Sign up now
                </a>
                {/* --- END OF CHANGE --- */}
            </div>
        </div>
    );
}

export default Hero;