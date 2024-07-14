import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/Admin.css";
import UserIcon from '@material-ui/icons/AccountCircle';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
            <nav class="navbar navbar-dark navbar-expand-lg bg-success">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Digital Download</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" href="/addproduct">Add Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/orders">Orders</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/customers">Customers</a>
        </li>
      </ul>
    </div>
    <div class="d-flex text-white">
    <span class="me-3">
    <a class="text-white logout" href="/">Logout</a></span>
      <span class="me-3">Admin</span>
      < UserIcon />
    </div>
  </div>
</nav>
            <div class="container-fluid mt-3">
                <h2>Orders</h2>
                <table className="table table-bordered mt-0">
                    <thead>
                        <tr>
                            <th><center>Order ID</center></th>
                            <th><center>Items</center></th>
                            <th><center>Shipping Address</center></th>
                            <th><center>Total Price</center></th>
                            <th><center>Payment Method</center></th>
                            <th><center>Payment Status</center></th>
                            <th><center>Delivery Status</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>
                                    <ul>
                                        {order.orderItems.map((item, index) => (
                                            <li key={index}>{item.name} - Qty: {item.qty}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    {order.shippingAddress.fullName}<br />
                                    {order.shippingAddress.address}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.postalcode}<br />
                                    {order.shippingAddress.country}
                                </td>
                                <td>${order.totalPrice}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                                <td>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders;
