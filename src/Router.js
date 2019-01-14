import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import HomePage from './Component/HomePage';
import ProductPage from './Component/ProductPage';
import ProductDetailPage from './Component/ProductDetailPage';
import LoginPage from './Component/LoginPage';
import SignUpPage from './Component/SignUpPage';
import ContactPage from './Component/ContactPage';
import VideoPage from './Component/VideoPage';
import CartPage from './Component/CartPage';
import PaymentPage from './Component/PaymentPage';
import MyData from './MyData';
import UserPage from './Component/UserPage'


const MyRouter = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/productCateId/:cateId" component={ProductPage}/>
        <Route path="/productBrandId/:brandId" component={ProductPage}/>
        <Route path="/product/:productId" component={ProductDetailPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/signUpPage" component={SignUpPage}/>
        <Route path="/contact" component={ContactPage}/>
        <Route path="/video" component={VideoPage}/>
        <Route path="/cart" component={CartPage}/>
        <Route path="/payment" component={PaymentPage}/>
        <Route path="/data" component={MyData}/>
        <Route path="/user" component={UserPage}/>
      </Switch>
    </Suspense>
  </Router>
);


export default MyRouter;