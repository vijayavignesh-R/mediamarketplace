import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';
import stripe from 'stripe';

const orderRouter = express.Router();

orderRouter.post("/create-checkout-session", expressAsyncHandler(async(req,res) => {

    const stripeApiKey = process.env.STRIPE_SECRET; 
    const stripeClient = new stripe(stripeApiKey); 

    console.log(req.body)
    const { orderItems } = req.body
    const lineItems = orderItems.map(item => ({
        price_data : {
            currency: "inr",
            product_data: {
                name : item.name,
                images : [item.image]
            },
            unit_amount : Math.round(item.price*100)
        },
        quantity: item.qty
    }));

    const session = await stripeClient.checkout.sessions.create({
        payment_method_types : ["card"],
        line_items : lineItems,
        mode : "payment",
        billing_address_collection: 'required', 
        shipping_address_collection: {
            allowed_countries: ['IN'], 
        },
        success_url : "http://localhost:3000/success",
        cancel_url : "http://localhost:3000/failed"
    })

    res.json({ id : session.id})
}));

orderRouter.get('/', expressAsyncHandler(async (req,res) => {
    const orders = await Order.find({});
    console.log(orders);
    res.send(orders);
}));

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req,res)=>{
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}))


orderRouter.post('/', isAuth ,expressAsyncHandler(async(req,res) => {
        if(req.body.orderItems.length === 0){
            res.status(400).send({
                message: 'Cart is empty'
            });
        }
        else{
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
                isPaid : true
            });
            const createdOrder = await order.save();
            res.status(201)
            .send({message: "New order created.", order: createdOrder});
        }
    })
);


orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }
    else{
        res.status(404).send({message: "Order not found."});
    }
}))



orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updateOrder = await order.save();
        res.send({
            message: "Order paid.",
            order: updateOrder
        })
    }
    else{
        res.status(404).send({message: "Order not found."});
    }
}))


export default orderRouter;
