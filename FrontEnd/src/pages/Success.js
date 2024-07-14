import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../styles/PlaceOrder.css"
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import { createdOrder } from '../actions/OrderAction'
import { ORDER_CREATE_RESET } from '../constants/OrderConstant'
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox";
import Header from '../components/Header';
import { loadStripe } from '@stripe/stripe-js';

const PlaceOrder = (props) => {

    const cart = useSelector((state) => state.cart);

    if(!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const {loading, success, error, order} = orderCreate;

    const toPrice = (num) => Number(
        num.toFixed(2) // 5.123 => "5.12" => 5.12
    );

    cart.itemsPrice = toPrice(cart.cartItems.reduce(
        (a,c) => a+c.qty * c.price, 0
    ));

    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);

    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();

    const placeOrder = () =>{
      
        dispatch(createdOrder({...cart, orderItems: cart.cartItems}));
    }


    useEffect(() => {
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({
                type: ORDER_CREATE_RESET
            });
        }
        
    }, [dispatch, order, props.history, success])

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
            <div className="container">
                <div class="row">
                    <div class="col-md-3"></div>
                    <div className="col-md-6 mt-5">
                    <center>
                        <h1>PAYMENT SUCCESS</h1>
                        <button type="button" onClick={placeOrder}
                            disabled = {cart.cartItems.length === 0}
                            className="placeorder-btn">
                                Click to Proceed
                        </button>
                    </center>    
                    </div>
                    <div class="col-md-3"></div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder
