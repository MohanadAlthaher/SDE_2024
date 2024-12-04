import {useState, useRef, useEffect} from 'react';
import Navbar from './navbar';
import HomePageText from "./homePage";
import ProductSection from './prodect';
import Footer from './Footer';


const Main = () => {
  return (
    <div className='Main'>
        <Navbar/>
        <HomePageText/>
        <ProductSection/>
        <Footer/>
    </div>
  );
};

export default Main;
