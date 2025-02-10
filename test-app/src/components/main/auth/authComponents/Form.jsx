import React from 'react';
import './Form.css';

const Form = ({children, ...props}) => {
    return <form  className="form-wrap" {...props}>{children}</form>;
};

export default Form;