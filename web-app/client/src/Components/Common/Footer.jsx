import React from 'react';

const Footer = () => {

    const currentYear = new Date().getFullYear();
    return (
        <footer className='w-full py-4 flex flex-col items-center justify-center bg-dark-blue text-white text-sm'>
            <p> &copy; {currentYear}  |  Все права защищены </p>
            <p> OAO "Агропромкредитбанк"</p>
        </footer>
    );
};

export default Footer;