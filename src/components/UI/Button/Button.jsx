import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    return ( 
        <button 
        className={[classes.Button, classes[props.btnType]].join(' ')} // btnType could be Sucess or Danger
        onClick={props.clicked}>
            {props.children}
        </button>
     );
}
 
export default Button;