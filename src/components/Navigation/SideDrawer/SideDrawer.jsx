import React from 'react';
import NavItems from '../NavItems/NavItems';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const SideDrawer = (props) => {

    let attachClasses = [classes.SideDrawer, classes.Close];

    if(props.open) {
        attachClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachClasses.join(' ')}>
                <Logo height='11%' marginBottom='32px'/>
                <nav>
                    <NavItems></NavItems>
                </nav>
            </div>
        </Aux> 
     );
}
 
export default SideDrawer;