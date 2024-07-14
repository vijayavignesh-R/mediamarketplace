import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/Admin.css"
import UserIcon from '@material-ui/icons/AccountCircle';

const AddProducts = () => {

  const [Name, setName] = useState('');
  const [Image, setImage] = useState('');
  const [Pdffile, setPdffile] = useState('');
  const [Brand, setBrand] = useState('');
  const [Description, setDescription] = useState('');
  const [Category, setCategory] = useState('');
  const [Price, setPrice] = useState('');

  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await axios.get('http://localhost:5000/api/products');
              setProducts(response.data);
          } catch (error) {
              console.error('Error fetching products:', error);
          }
      };
      fetchProducts();

  }, [alertMessage]);

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        let response;
        if (editMode) {
          response = await axios.put(`http://localhost:5000/api/products/${editProductId}`, {
            name: Name,
            image: Image,
            pdffile: Pdffile,
            brand: Brand,
            description: Description,
            category: Category,
            price: Price
          });
          setEditMode(false); 
          setEditProductId(null);
        } else {

          response = await axios.post('http://localhost:5000/api/products/add', {
            name: Name,
            image: Image,
            pdffile: Pdffile,
            brand: Brand,
            description: Description,
            category: Category,
            price: Price
          });
        }
      setAlertMessage(response.data.message);
      setName('');
      setImage('');
      setPdffile('');
      setBrand('');
      setDescription('');
      setCategory('');
      setPrice(''); 
      
      setTimeout(() => {
        setAlertMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEdit = async (productId) => {
    try {
    
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      const product = response.data;
  
      if (product) {
       
        setName(product.name);
        setImage(product.image);
        setPdffile(product.pdffile);
        setBrand(product.brand);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price);
       
         setEditMode(true);
         setEditProductId(product._id);
      } else {
        console.error('Product not found.');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setAlertMessage(response.data.message);
   
      const updatedProducts = products.filter(product => product._id !== productId);
      setProducts(updatedProducts);

      setTimeout(() => {
        setAlertMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

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
      <ul class="navbar-nav mb-2 mb-lg-0">
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
  <form onSubmit={handleSubmit}>
    <div class="row">
      <div class="col-md-12"><center><u><h3>ADD PRODUCTS</h3></u></center></div>
    </div>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        {alertMessage && (
                    <div className="alert alert-success">{alertMessage}</div>
                  )}
      </div>
      <div class="col-md-3"></div>
    </div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-4">
        <div class="form-group mb-3">
          <label for="image" class="form-label">Image</label>
          <input type="text" class="form-control" name="image" value={Image} 
                  onChange={(e) => setImage(e.target.value)}  autoComplete='off' required/>
        </div>
        <div class="form-group mb-3">
          <label for="image" class="form-label">PDF File</label>
          <input type="text" class="form-control" name="pdffile" value={Pdffile} 
                  onChange={(e) => setPdffile(e.target.value)}  autoComplete='off'/>
        </div>
        <div class="form-group mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" name="name" value={Name} 
                  onChange={(e) => setName(e.target.value)} autoComplete='off' required/>
        </div>
        <div class="form-group mb-3">
          <label for="description" class="form-label">Description</label>
          <input type="text" class="form-control" name="description" value={Description} 
                  onChange={(e) => setDescription(e.target.value)} autoComplete='off' required/>
        </div>
      </div>
        <div class="col-md-4">
        <div class="form-group mb-3">
          <label for="category" class="form-label">Category</label>
          <input type="text" class="form-control" name="category" value={Category} 
                  onChange={(e) => setCategory(e.target.value)} autoComplete='off' required/>
        </div>
        <div class="form-group mb-3">
          <label for="brand" class="form-label">Author</label>
          <input type="text" class="form-control" name="brand" value={Brand} 
                  onChange={(e) => setBrand(e.target.value)}  autoComplete='off' required />
        </div>
        <div class="form-group mb-3">
          <label for="price" class="form-label">Price</label>
          <input type="text" class="form-control" name="price" value={Price} 
                  onChange={(e) => setPrice(e.target.value)} autoComplete='off' required/>
        </div>
        <div class="form-group mb-3">
          <center><input type="submit" name="sbt-product" value="Submit" class="btn btn-primary mt-4"/></center>
        </div>
        </div>
        <div class="col-md-2"></div>
    </div>
    </form>
    </div>
    <div class="container-fluid">
    <h2>Products List</h2>
            <table class="table table-bordered mt-0">
                <thead>
                    <tr>
                        <th><center>Image</center></th>
                        <th><center>Name</center></th>
                        <th><center>Category</center></th>
                        <th><center>Brand</center></th>
                        <th><center>Price</center></th>
                        <th><center>Rating</center></th>
                        <th><center>No. of Reviews</center></th>
                        <th><center>Action</center></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td><img src={product.image} alt={product.name} width="50" /></td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>{product.price}</td>
                            <td>{product.rating}</td>
                            <td>{product.numRev}</td>
                            <td>
                              <button type="button" className="btn btn-primary me-2" onClick={() => handleEdit(product._id)}>Edit</button>
                              <button type="button" className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default AddProducts
