import React from "react";
import "./Itemcd Page.css";

const ProductPage = ({ product }) => {
  if (!product) {
    return <div className="product-page-error">Product not found</div>;
  }

  return (
    <div className="product-page-container">
      <div className="product-page-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-actions">
            <button className="btn btn-add-to-cart">Add to Cart</button>
            <button className="btn btn-buy-now">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage
// Replace with data fetched from your database
const exampleProduct = {
  name: "Running Shoes",
  price: "99.99",
  description:
    "These running shoes are designed for optimal performance and comfort.",
  image: "https://via.placeholder.com/300",
};

export default function App() {
  return <ProductPage product={exampleProduct} />;
}
