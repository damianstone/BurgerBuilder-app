import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCancel = () => {
        this.props.history.goBack(); // go to the last page
    };

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCancel={this.checkoutCancel}
                checkoutContinue={this.checkoutContinue}
                />

                <Route 
                path={this.props.match.path + '/contact-data'} 
                /* pasar props como argumento para pasar history y todo lo de router tambn */
                component={ContactData}
                />
            </div>
        );   
    };
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    };
};


export default connect(mapStateToProps)(Checkout);

// usando render e ROUTE se puede pasar el componente de una manera en que se le puede pasar tambien propiedades.
// funcion igual que components, solo que con props.
