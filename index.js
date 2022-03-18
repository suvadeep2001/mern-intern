require("dotenv").config();
const express = require('express');

const app = express();

require('./config/db').connect();

const port = process.env.PORT || 5000

const userRouter = require("./routes/user")
const userProduct = require("./routes/product")
const orderProduct = require("./routes/order")
const cart = require("./routes/cart")

app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/products",userProduct);
app.use("/api/orders",orderProduct);
app.use("/api/cart",cart);

app.listen(port,()=>{
    console.log("Backend listening on port "+ port);
})