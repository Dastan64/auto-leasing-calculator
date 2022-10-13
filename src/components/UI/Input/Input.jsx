import React from 'react';
import './Input.scss';

const Input = ({ value, handleChange, handleBlur, name, min, max, isPercent, initialPayment, disabled }) => {
    return (
        <>
            {isPercent ?
                <div className="input-container input-container--window">
                    <>
                        <span>{initialPayment?.toLocaleString()}</span>
                        <input className="input input--window" name={name} value={`${value}%`}
                               onChange={handleChange} onBlur={handleBlur} disabled={disabled}></input>
                    </>
                    <input className="range-input" name={name} type="range" value={value} min={min} max={max}
                           onChange={handleChange} disabled={disabled}/>
                </div>
                : (
                    <div className="input-container">
                        <input className="input" name={name} value={value}
                               onChange={handleChange} onBlur={handleBlur} disabled={disabled}></input>
                        <input className="range-input" name={name} type="range" value={value} min={min}
                               max={max}
                               onChange={handleChange} disabled={disabled}/>
                    </div>
                )
            }
        </>
    );
};

export default Input;
