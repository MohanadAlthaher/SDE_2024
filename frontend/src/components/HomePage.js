import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  // Updated categories with image URLs
  const categories = [
    { name: "Sport Shoes", imageUrl: "https://m.media-amazon.com/images/I/613uwSK20XL._AC_SL1002_.jpg" },
    { name: "Casual Shoes", imageUrl: "https://redtape.com/cdn/shop/files/RSL0075_1.jpg?v=1728028221" },
    { name: "Formal Shoes", imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQpUd-7Vzhauwh-n-6hWbHBz_ncXrxb21M_Ipqrc5msEqcxLe-H67WkYcng_18bCiwaz4aF2Z0eTqNodQvG92didqAtxblL4jbBxlohnHz0EofrSZGuvPRt2Q" },
    { name: "Boots", imageUrl: "https://thursdayboots.com/cdn/shop/products/1024x1024-Men-Explorer-BlackMatte-3.4_1024x1024.jpg?v=1602090871" },
    { name: "Sandals and Slippers", imageUrl: "https://t3.ftcdn.net/jpg/06/32/01/70/360_F_632017085_K2rclDxdtvxDVfAtDeR6VZRiJfdK3Igx.jpg" }
  ];

  const brands = ["Nike", "Adidas", "Puma", "Reebok","Clarks","Dr Martens","Timberland","Vans"];
  const sampleProducts = [
    { id: 1, name: "Nike Air Max", price: 120, brand: "Nike", category: "Sport Shoes", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Adidas Ultraboost", price: 150, brand: "Adidas", category: "Casual Shoes", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "Puma RS-X", price: 100, brand: "Puma", category: "Sport Shoes", imageUrl: "https://via.placeholder.com/150" },
    { id: 4, name: "Reebok Work Shoes", price: 80, brand: "Reebok", category: "Formal Shoes", imageUrl: "https://via.placeholder.com/150" },
    { id: 5, name: "Dr Martens 1460", price: 150, brand: "Dr Martens", category: "Boots", imageUrl: "https://via.placeholder.com/150" },
    { id: 6, name: "Timberland Classic", price: 130, brand: "Timberland", category: "Boots", imageUrl: "https://via.placeholder.com/150" },
    // Add more products as needed
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  const filterProducts = () => {
    let filtered = products;
    if (priceFilter) {
      filtered = filtered.filter((product) => product.price <= priceFilter);
    }
    if (brandFilter) {
      filtered = filtered.filter((product) => product.brand === brandFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [priceFilter, brandFilter, searchQuery]);

  const handleShowMore = () => {
    setShowAll(true);
  };

  return (
    <div className="home-page">
      <h1>Classic Shoes</h1>
      <h3>The Best There Is</h3>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for shoes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories with Images */}
      <div className="categories">
        <h3>Categories</h3>
        <div className="category-list">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="category-image"
              />
              <button className="category-button">{category.name}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <h3>Filter by:</h3>
        <div className="filter-group">
          <label>Price (max):</label>
          <input
            type="number"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            placeholder="Enter max price"
          />
        </div>
        <div className="filter-group">
          <label>Brand:</label>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts
          .slice(0, showAll ? filteredProducts.length : 3)
          .map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Brand: {product.brand}</p>
              <p>Price: ${product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
      </div>

      {/* Show More Button */}
      {!showAll && filteredProducts.length > 3 && (
        <div className="show-more">
          <button onClick={handleShowMore}>Show More</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
