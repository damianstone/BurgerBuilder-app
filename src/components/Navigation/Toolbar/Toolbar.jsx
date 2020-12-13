import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './Toolbar.module.css';

const Toolbar = (props) => {
    return ( 
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <Logo height='80%'/>
            <nav className={classes.DesktopOnly}>
                <NavItems />
            </nav>
        </header>
     );
}
 
export default Toolbar;