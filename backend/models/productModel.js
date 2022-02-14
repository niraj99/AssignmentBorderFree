const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name : { type : String, required : true},
    image : { type : String , required : true},
    brand : { type : String , required : true},
    category : { type : String , required : true},
    price : {type : Number , required : true},
    countInStock : { type : Number , required : true},
    rating : { type : Number , required : true},
    numReviews : { type : Number , required : true},
    isClicked : {type : Number ,default : 0, required : true}

},
{
    timestamps : true
})


const Product = mongoose.model("products" , productSchema);

module.exports = Product;