require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/order");
const { connectDB } = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));