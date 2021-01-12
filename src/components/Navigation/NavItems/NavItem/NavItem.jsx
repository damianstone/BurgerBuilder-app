import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.css'

const NavItem = (props) => {
    return ( 
        <li className={classes.NavItem}>
            <NavLink 
            to={props.link} 
            activeClassName={classes.active} // para que sea vea el hover al navegar con la navbar, props especifica de react-router
            exact={props.exact}
            > 
                {props.children}
            </NavLink>
        </li>
     );
}
 
export default NavItem;