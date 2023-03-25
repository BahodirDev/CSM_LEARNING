import React from 'react';
import './loader.css'

function Loader() {
    return (
        <div className='d-flex justify-content-center align-items-center ' style={{height:'80vh', zIndex:"999"}}>

            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    )
}

export default Loader
