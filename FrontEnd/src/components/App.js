import React from 'react'
import Header from './Header'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage'
import PdfView from "../pages/PdfView"
import Cart from '../pages/Cart';
import SignIn from '../pages/SignIn'
import Register from "../pages/Register"
import ShippingAddress from '../pages/ShippingAddress';
import PaymentMethod from '../pages/PaymentMethod';
import PlaceOrder from '../pages/PlaceOrder';
import OrderDetails from "../pages/OrderDetails"
import OrderHistory from '../pages/OrderHistory';
import UserProfile from '../pages/UserProfile';
import PrivateRoute from './PrivateRoute';
import SearchResults from '../pages/SearchResults';
import AllProducts from '../pages/Admin/AllProducts';
import AddProducts from '../pages/Admin/AddProducts';
import Orders from '../pages/Admin/Orders';
import Customers from '../pages/Admin/Customers';
import CategoryBasedPage from '../pages/CategoryBasedPage';
import AdminLogin from '../pages/Admin/AdminLogin';
import Success from '../pages/Success';
import Failed from '../pages/Failed';


const App = () => {


    return (
        <>

        <Router>
            <Switch>
                
                <Route path="/" component={Home} exact></Route>

                <Route exact path="/cart/:id?" component={Cart}></Route>
                <Route exact path="/signin" component={SignIn}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route path="/products/product/:id" component={ProductPage}></Route>
                <Route path="/pdfview/product/:id" component={PdfView}></Route>
                <Route path="/shipping" component={ShippingAddress}></Route>
                <Route path="/payment" component={PaymentMethod}></Route>
                <Route path="/placeorder" component={PlaceOrder}></Route>
                <Route path="/order/:id" component={OrderDetails}></Route>
                <Route path="/orderhistory" component={OrderHistory}></Route>
                <PrivateRoute path="/profile" component={UserProfile}></PrivateRoute>
                <Route path="/searchresults/:query" component={SearchResults} exact></Route>
                <Route path="/category/:cat" component={CategoryBasedPage} exact></Route>
                <Route path="/success" component={Success}></Route>
                <Route path="/failed" component={Failed}></Route>


                {/* Admin sectiojn routes */}
                <Route path="/adminlogin" component={AdminLogin}></Route>
                <Route path="/productlist" component={AllProducts}></Route>
                <Route path="/addproduct" component={AddProducts}></Route>
                <Route path="/orders" component={Orders}></Route>
                <Route path="/customers" component={Customers}></Route>

            </Switch>
            
            
            

        </Router>

        </>
        
    )
}

export default App
