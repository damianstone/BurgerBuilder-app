import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    constructor(props) {
        super(props);
        this.orderHandler = this.orderHandler.bind(this);
    }
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postal: '',
            city: '',
        },
        loading: false,
    }

    orderHandler(e) {
        e.preventDefault();
        console.log(this.props.ingredients);
        console.log(this.props.price);

        this.setState({loading: true});
        // estructura de como van a llegar los datos
        const order = {
            ingredients: this.props.ingredients, 
            price: this.props.price,
            customer: {
                name: 'Damian',
                address: {
                    street: 'Teststreet 1',
                    zipCode: 'CHU P4L0',
                    country: 'United Kingdom'
                },
                email: 'test@gmail.com',
            },
            deliveryMethod: 'fastest'
        };
        
        // /orders.json para crear una rama en la base de datos que se llame orders
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                // PARA QUE CUANDO SE HAGA EL PEDIDO LA PAGINA SE REDIRECCIONE A HOME
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false })
            });
    }

    render() {
        let form  = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
                <input className={classes.Input} type='email' name='email' placeholder='Your Email' />
                <input className={classes.Input} type='text' name='street' placeholder='Street' />
                <input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    };
};

export default ContactData;
