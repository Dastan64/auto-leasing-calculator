import React from 'react';
import './Button.scss';

const Button = ({ isSubmitting, children }) => {
    return <button className="button" disabled={isSubmitting}><span>{children}</span></button>
};

export default Button;
