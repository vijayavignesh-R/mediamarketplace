// AdminLogin.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Implement authentication logic here
    if (username === 'admin' && password === '12345') {
      // If authentication succeeds, redirect to desired page
      history.push('/addproduct');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
          <nav class="navbar navbar-dark navbar-expand-lg bg-success">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Digital Download</a>
    </div>
</nav>
<div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-info p-3">
          <h2 className="text-center">Admin Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label>Username:</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group mb-3">
              <label>Password:</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminLogin;
