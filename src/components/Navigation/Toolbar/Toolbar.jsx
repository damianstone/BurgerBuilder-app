import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.css';

const Toolbar = (props) => {
    return ( 
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <Logo height='80%'/>
            <nav className={classes.DesktopOnly}>
                <NavItems />
            </nav>
        </header>
     );
}
 
export default Toolbar;