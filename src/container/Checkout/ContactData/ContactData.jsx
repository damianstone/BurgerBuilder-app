import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    constructor(props) {
        super(props);
        this.orderHandler = this.orderHandler.bind(this);
    }

    createObject = (placeholder, type, minLen, maxLen) => {
        return {
            elementType: 'input',
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: '', 
            validation: {
                required: true,
                minLength: minLen,
                maxLength: maxLen,
            },
            valid: false,
        };
    };

    state = {
        orderForm : {
            name: this.createObject('Your Name', 'text'),
            street: this.createObject('Street', 'text'),
            zipCode: this.createObject('Your Zip Code', 'text', 5, 5),
            country: this.createObject('Your Country', 'text'),
            email: this.createObject('Your E-Mail', 'email'),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
            },
        },
        loading: false,
    }
    
    // SUBMIT LOS DATOS A FIREBASE
    orderHandler(e) {
        e.preventDefault();
        this.setState({loading: true});

        const formData = {};
        // formElementIdentifier es name, street, zip...
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value

        }
        // estructura de como van a llegar los datos
        const order = {
            ingredients: this.props.ingredients, 
            price: this.props.price,
            orderData: formData,
        };
        
        // /orders.json para crear una rama en la base de datos que se llame orders
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                // para que cuando se haga el pedido la pagina redireccione a home
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false })
            });
    }

    //VALIDATION
    checkValidation = (value, rules) => {
        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== ''; // if not equal to an empthy string
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && value.length <= rules.maxLength;
        }

        return isValid;
    }

    // CAMBIAR EL ESTADO A TRAVES DE ONCHANGE
    inputChangedHandler = (event, inputIdentifier) => {
        //COPIA DEL ESTADO
        const updatedForm = {
            ...this.state.orderForm
        };
        // COPIA DE LOS SUBDATOS DEL ESTADO
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };
        // ONCHANGE
        updatedFormElement.value = event.target.value;
        // update validation
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
        console.log(updatedFormElement)
        updatedForm[inputIdentifier] = updatedFormElement;
        //CAMBIAR EL ESTADO AL TIPIAR EN LOS CAMPOS
        this.setState({orderForm: updatedForm})
    };

    render() {
        // TRANFORMAR EL ESTADO EN UN ARRAY
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form  = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
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
