import React from 'react';
import './Link.css';
import { NavLink } from 'react-router-dom';

const Link = ({to, namePage}) => {
    return <NavLink to={to} className='navLinkComponent' >{namePage}</NavLink>;
};

export default Link;