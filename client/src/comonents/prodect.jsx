import React, { useState, useEffect } from "react";
import "./product.css";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const sampleProducts = [
    { id: 1, name: "Nike Air Max", price: 120, brand: "Nike", category: "Sport Shoes", imageUrl: "https://m.media-amazon.com/images/I/613uwSK20XL._AC_SL1002_.jpg" },
    { id: 2, name: "Adidas Ultraboost", price: 150, brand: "Adidas", category: "Casual Shoes", imageUrl: "https://redtape.com/cdn/shop/files/RSL0075_1.jpg?v=1728028221" },
    { id: 3, name: "Puma RS-X", price: 100, brand: "Puma", category: "Sport Shoes", imageUrl:  "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQpUd-7Vzhauwh-n-6hWbHBz_ncXrxb21M_Ipqrc5msEqcxLe-H67WkYcng_18bCiwaz4aF2Z0eTqNodQvG92didqAtxblL4jbBxlohnHz0EofrSZGuvPRt2Q" },
    { id: 4, name: "Reebok Work Shoes", price: 80, brand: "Reebok", category: "Formal Shoes", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUE77RMk7KR2slv-bZIp4oq5CGRpPGOzGFmXyQr1YJA7dVzvY0BAwJlpw&s" },
    { id: 5, name: "Dr Martens 1460", price: 150, brand: "Dr Martens", category: "Boots", imageUrl: "https://thursdayboots.com/cdn/shop/products/1024x1024-Men-Explorer-BlackMatte-3.4_1024x1024.jpg?v=1602090871" },
    { id: 6, name: "Timberland Classic", price: 130, brand: "Timberland", category: "Boots", imageUrl: "https://t3.ftcdn.net/jpg/06/32/01/70/360_F_632017085_K2rclDxdtvxDVfAtDeR6VZRiJfdK3Igx.jpg" },
  ];

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  return (
    <div className="product-view">
      <h2>Explore Popular Items</h2>
      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <button className="blue-button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
