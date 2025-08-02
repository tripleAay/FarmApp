import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Testimonial from '../components/Testimonial';
import Gateway from '../components/Gateway';
import Product from '../components/Products';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header/>
      <HeroSection/>
      <Gateway/>
      <Product/>
      <Testimonial/>
      <Footer/>
    </div>
  );
};

export default Home;
