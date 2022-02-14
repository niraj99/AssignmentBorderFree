const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const products = require("./data/products");

const Product = require("./models/productModel");
const connectDB = require ("./config/db");

dotenv.config();
connectDB();


const importData = async () =>{
    try {
        await Product.deleteMany();
        const allProd = await Product.insertMany(products)
        console.log("Data imported".green.inverse);
        process.exit()

        
    } catch (error) {

        console.log(`${error}`.red.inverse);
        process.exit(1);
        
    }
}


const deleteData = async () =>{
    try {

        await Product.deleteMany();

        console.log("Data Deleted".red.inverse);
        process.exit()

        
    } catch (error) {

        console.log(`${error}`.red.inverse);
        process.exit(1);
        
    }
}


if(process.argv[2] === "-d"){
    deleteData();

}else{
    importData();
}