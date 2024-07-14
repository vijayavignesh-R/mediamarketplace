import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/Admin.css"
import UserIcon from '@material-ui/icons/AccountCircle';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
      const fetchCustomers = async () => {
          try {
              const response = await axios.get('http://localhost:5000/api/users');
              setCustomers(response.data);
          } catch (error) {
              console.error('Error fetching customers:', error);
          }
      };

      fetchCustomers();
  }, []);
    return (
        <div>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
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
    <h2>Registered Customers List</h2>
            <table class="table table-bordered border-primary mt-0">
                <thead>
                    <tr>
                        <th><center>Name</center></th>
                        <th><center>Email</center></th>
                        <th><center>Password</center></th>
                        <th><center>IsAdmin</center></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.password}</td>
                            <td>{customer.isAdmin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Customers
