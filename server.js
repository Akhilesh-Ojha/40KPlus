const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Product = mongoose.model("products", new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    title: String,
    image: String,
    description: String,
    price: Number,
    availableSizes: [String]
}));

app.get("/api/products", async (req , res) => {
    const product = await Product.find({});
    res.send(product);
});

app.post("/api/product", async(req, res) => {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.send(saveProduct);
});

app.delete("/api/product/:id", async(req,res) => {
    const deletedproduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedproduct);
})

const port = process.env.port || 5000;
app.listen(port, console.log('Server started'));