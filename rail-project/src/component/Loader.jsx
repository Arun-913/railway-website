import React from 'react';
import '../css/loader.css';

const Loader = () => {
  return (
    <>
        <div className='loader-parent'>
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        </div>
    </>
  );
}

export default Loader;
