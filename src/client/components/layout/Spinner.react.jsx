import React from 'react';

const Spinner = () => {
    return (
        <div
            className="loading-icon"
            style={{
                position: 'fixed',
                zIndex: 9998,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }}
        >
            <i className="zmdi zmdi-refresh zmdi-hc-4x zmdi-hc-spin" />
        </div>
    );
};

export default Spinner;
