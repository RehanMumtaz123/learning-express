const router = require("express").Router();
const ErrorHandler = require("../Errors/errorhandler");
let productData = require("../productData");

router.get("/products", (req, res) => {
  res.render("product", { title: "My products" }); //first argument in render is the name of the view
});
router.get("/api/products", (req, res) => {
  res.json(productData);
});


router.post("/api/products", (req, res,next) => {
  // console.log(req.body);
  const {name, price} = req.body;
  if (!name || !price) {
    // now calling static methods of the class so.. way of calling it is below wothout making an object of that class
    next(ErrorHandler.validationError('name and price fields are required'));


    // throw new Error('All fields are required')
    // return res.status(422).json({ error: "all fields are required" }); // validation error
  }
  const product={ name, price, id: new Date().getTime().toString() }
  productData.push(product);
  res.json(product);
});

router.delete("/api/products/:productId", (req, res) => {
  productData=productData.filter((product)=> req.params.productId !=  product.id  )
  res.json({status:"ok"});
});

module.exports = router;