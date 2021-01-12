import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.module.css'

const NavItems = (props) => {
    return ( 
        <ul className={classes.NavItems}>
            <NavItem link='/' exact={true}>Burger Builder</NavItem>
            <NavItem link='/orders' >Checkout</NavItem>
            {/* link= es to= pero pasado como props */}
        </ul>
     );
}
 
export default NavItems;