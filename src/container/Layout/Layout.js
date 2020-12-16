import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerTogglerHandler = () => {
        this.setState((prevState) => { // the way to use a prev state 
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }


    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})

    }
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerTogglerHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
};

export default Layout;
