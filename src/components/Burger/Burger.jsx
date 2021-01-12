import React from 'react'; //imrc
import classes from './Burger.module.css';
import Ingredients from './Ingredients/Ingredients';

const Burger = (props) => {

    let transformIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <Ingredients key={igKey + i} type={igKey} />
            });
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []); 

    if (transformIngredients.length === 0) {
        transformIngredients = <p>Agrega ingredientes aweonao</p>
    }

    return (
        <div className={classes.Burger}>
            <Ingredients type='bread-top' />
            {transformIngredients}
            <Ingredients type='bread-bottom' />
        </div>
    );
}


export default Burger;
