import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/ProdcutActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import '../styles/ProductPage.css';
import '../styles/Pdf.css';
import Header from '../components/Header';

const PdfView = ({ match }) => {
  const productId = match.params.id; // Assuming you get the product ID from the route parameter
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const copyToClipboard = () => {
    var aux = document.createElement("input");
    aux.setAttribute("value", "You can no longer print. This is part of the new system security measure.");
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert("Print screen disabled.");
  }

  useEffect(() => {
    dispatch(detailsProduct(productId));

        // Disable print
        window.addEventListener('keydown', function (e) {
          if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
          }
        });
    
        // Disable screenshot
        window.addEventListener('keyup', function (e) {
          if (e.key === 'PrintScreen') {
            copyToClipboard();
            e.preventDefault();
          }
        });
    
        // Disable right-click
        document.addEventListener('contextmenu', function (e) {
          e.preventDefault();
        });
          
        // Disable text selection
        document.addEventListener('selectstart', function (e) {
          e.preventDefault();
        });
    
        const iframe = document.querySelector('iframe');
    
        if (iframe) {
          const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
               
          // Disable right-click within iframe
          iframeDocument.addEventListener('contextmenu', function (e) {
            e.preventDefault();
          });
    
          // Disable text selection within iframe
          iframeDocument.addEventListener('selectstart', function (e) {
            e.preventDefault();
          });
        }
  }, [dispatch, productId]);

  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <MessageBox variant="danger">{error}</MessageBox>;
  }

  return (
    <div>
    <Header />
    {product && (
      <center>
        <iframe src={product.pdffile} width="1024px" height="768px" />
      </center>
    )}
  </div>
  );
};

export default PdfView;
