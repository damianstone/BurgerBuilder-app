import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux';
import Controls from '../../components/Burger/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import Summary from '../../components/Burger/OrderSummary/Summary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/errorHandler/ErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';


class BurgerBuilder extends Component {

    state =  {
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        console.log(this.props);
        //axios.get('https://burger-app-36a5c-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients) // create an array
        .map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {

        const disableInfo = {
            ...this.props.ings
        } 
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <Controls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.price}
                    />
                </Aux>
            );

            orderSummary = (
                <Summary 
                ingredients={this.props.ings} 
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinue={this.purchaseContinueHandler} />
            );
        }


        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionType.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios)); // two higher order compnentes