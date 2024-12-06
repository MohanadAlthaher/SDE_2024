import React from 'react'
import { Footer, Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
          Welcome to our store! We specialize in offering a diverse range of high-quality shoes for every occasion and need. 
          Whether you’re looking for stylish men's shoes, elegant women's shoes, or comfortable children's footwear, 
          we have something for everyone. Our mission is to provide the perfect blend of comfort, durability, 
          and style to keep your feet happy. With a passion for quality and customer satisfaction, 
          we are committed to making your shopping experience delightful.
        </p>

        <h2 className="text-center py-4">Our Shoe Categories</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img 
                className="card-img-top img-fluid" 
                src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Men's Shoes" 
                height={160} 
              />
              <div className="card-body">
                <h5 className="card-title text-center">Men's Shoes</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img 
                className="card-img-top img-fluid" 
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Women's Shoes" 
                height={160} 
              />
              <div className="card-body">
                <h5 className="card-title text-center">Women's Shoes</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img 
                className="card-img-top img-fluid" 
                src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Children's Shoes" 
                height={160} 
              />
              <div className="card-body">
                <h5 className="card-title text-center">Children's Shoes</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
