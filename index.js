const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const snippetRouter = require("./routers/snippetRouter");

dotenv.config();
const app = express();

app.listen(5000, ()=>{console.log("Server started at Port 5000")});

app.use(express.json());
app.use("/snippet", snippetRouter);

mongoose.connect(process.env.MDB_CONNECT_STRING, (err)=>{
    if(err) return console.error(err);
    console.log("Connected to MongoDB")
});
