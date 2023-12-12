const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")
const AuthRoutes = require("./src/Routes/AuthRoutes");
const userRoute = require("./src/Routes/UserRoutes");
const productRoute = require("./src/Routes/ProductRoutes");
const orderRoute = require("./src/Routes/orderRoutes")
const cartRoute = require("./src/Routes/CartRoutes");
dotenv.config();
app.use(cors())
app.use(express.json());
app.use("/auth", AuthRoutes);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order",orderRoute);
app.use("/cart",cartRoute)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection is successful");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("port is running at 5000");
});
