import React,{useEffect} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Home.css"
import Product from '../components/Product'
import Hme from './Hme'
import { listProducts } from '../actions/ProdcutActions'
import Nfoot from './Nfoot';
import Ndriver from './Ndriver';
import Nvirus from './Nvirus';
import Nebooks from './Nebooks';
import Support from './support';
import Naccess from './Naccess';

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
                      <img src="https://images7.alphacoders.com/132/1326369.png" alt=""/>
                    </div>
                    <div className="banners">
                        <img src="https://www.alphaebarcode.com/images/Download-banner.jpg" alt=""/>
                    </div>
                    <div className="banners">
                        <img src="https://thumbs.dreamstime.com/b/software-development-business-process-automation-internet-technology-concept-virtual-screen-software-development-143587196.jpg" alt=""/>
                    </div>

                </Slider>
            
            </div>

            <Ndriver />

            <Naccess />

            <Nvirus />

            <Nebooks />
            
            <ProductList/>

            <Support/>

            <Nfoot />

        </div>
    )
}

export default Home
