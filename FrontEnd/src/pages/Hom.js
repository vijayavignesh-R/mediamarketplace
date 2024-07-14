import React,{useEffect} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Home.css"
import Product from '../components/Product'
import { listProducts } from '../actions/ProdcutActions'

const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    const productList = useSelector( state => state.productList);
    const {loading,error,products} = productList;

    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 800,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 800,
                }  
            },
            {
                breakpoint: 900,
                settings: {
                    dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 800,
                }  
            },
            {
                breakpoint: 680,
                settings: {
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 800,
                }  
            },
            
        ]
    }

    return (
        <div className="home-page-container">
<Header/>
            <div className="banner-container">

                <Slider {...settings}>

                    <div className="banners">
                      <img src="https://www.shutterstock.com/image-vector/banner-book-festival-open-books-600nw-1899104866.jpg" alt=""/>
                    </div>
                    <div className="banners">
                        <img src="https://www.alphaebarcode.com/images/Download-banner.jpg" alt=""/>
                    </div>
                    <div className="banners">
                        <img src="https://as1.ftcdn.net/v2/jpg/02/69/27/88/1000_F_269278896_uTyXgz3MzB7g9Rpz2oFGzwX4tip1zjmj.jpg" alt=""/>
                    </div>

                </Slider>
            
            </div>
            
            <ProductList/>


            <div className="home-product-slider">

                <h2 className="sec-title">More Downloadable Products</h2>

                <Slider {...settings}>

                    {products && products.map((product)=>{
                            return(
                                <Product key={product._id} product={product} /> 
                            )
                        })
                    }

                </Slider>
            </div>


        </div>
    )
}

export default Home
