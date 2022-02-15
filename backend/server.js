const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const cors = require("cors");
const connectDB = require ("./config/db");
const asyncHandler = require("express-async-handler");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req,res) =>{
    res.json({
        status: "Ok"
    })
})


const updateClick =  async(req,res,next)=>{
    const product = await Product.findById(req.params.id)
    var updateClick = product.isClicked
    updateClick += 1;

    const filter = { _id: product._id};
    const update = { isClicked: updateClick };

    const updatedVal = await Product.findOneAndUpdate(filter,update,{
        new : true
    })
    req.product = product
    next();
}

app.get("/api/products", asyncHandler( async(req,res) => {
    const product = await Product.find({})
    res.json(product);
}))

// app.use("/api/products/:id", updateClick);

app.get("/api/products/:id",updateClick, asyncHandler(async(req,res) =>{

    const product = req.product

    if(product) {
        res.json(product);
    }else{
        res.status(404)
        throw new Error("Product Not Found");
    }
}))


app.listen(5000,()=>{
    console.log("Server is running at Port 5000".yellow.underline)
})