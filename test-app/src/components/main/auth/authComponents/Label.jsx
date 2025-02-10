import React from 'react';

const Label = (props) => {
    return <label htmlFor={props.htmlFor}>{props.labelTitle}</label>;
};

export default Label;