import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hoc/errorHandler/ErrorHandler'; // PARA QUE CUANDO SE CAMPE UN ERROR EL PROGRAMAM DE DETENGA

export class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        // FETCHING DATA / TRAER LAS ORDENES DESDE FIREBASE 
        axios.get('/orders.json')
             .then(response => {
                 console.log(response.data) // firebase devuelve los datos como un objeto

                 const fetchOrders = []
                 for (let key in response.data) { // transformar los datos de firebase en arrays
                     fetchOrders.push({
                         ...response.data[key],
                         id: key,
                        })
                 }
                 // DESPUES DE TRAER LOS DATOS CAMBIAR EL ESTADO
                 this.setState({
                     loading: false,
                     orders: fetchOrders
                })
             })
             .catch(err => {
                 this.setState({loading: false})
                 console.log(err);
             })
    }


    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id} 
                    ingredients={order.ingredients}
                    price={order.price}
                    />
                ))}
            </div>
        )
    }
}

export default ErrorHandler(Orders, axios);

//class component => RCE
// functional => rafce
