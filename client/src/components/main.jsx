import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero pb-3">
        <div
          className="card bg-dark text-white border-0 mx-3 position-relative"
          style={{
            height: "500px",
            overflow: "hidden",
          }}
        >
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
          <div
            className="card-img-overlay d-flex flex-column align-items-center justify-content-center text-center"
            style={{
              background: "rgba(0, 0, 0, 0.5)", // Dark overlay for better readability
              padding: "1rem",
            }}
          >
            <div className="container">
              <h5 className="card-title fs-1 fw-light text-white">
                New Season Arrivals
              </h5>
              <p className="card-text fs-5 text-white">
                Discover the latest trends in footwear and step up your style
                game. Our collection offers the perfect blend of comfort and
                fashion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
