require("dotenv").config();
const express = require('express');

const app = express();

require('./config/db').connect();

const port = process.env.PORT || 5000

const userRouter = require("./routes/user")

app.use(express.json());

app.use("/api/users",userRouter);

app.listen(port,()=>{
    console.log("Backend listening on port "+ port);
})