const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const Product = require("./models/productModel");

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/product", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!Product) {
      return res.status(404).json({ message: `we can't find id ${id}` });
    }
    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  });  

app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/product/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!Product){
            res.status(200).json({message: "cant find product by id"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

mongoose
  .connect(
    "mongodb+srv://fauzanaunillah13:KINGzLEON@cluster0.eo8vwrz.mongodb.net/node_api"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Surfing in port ${port}`);
    });

    console.log("SUCCESS connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
