import React from 'react';

const Footer = () => {
    const year = new Date()
    return (
        <footer className='footer'>
            footer
            <p>{year.getFullYear()}</p>
        </footer>
    );
};

export default Footer;