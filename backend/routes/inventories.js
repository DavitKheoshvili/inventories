const express = require("express");
const { getAllProducts, createProduct, deleteProduct } = require("../db.js");
const router = express();

router
    .get("/", (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        const page = parseInt(req.query.page) || 1;
        getAllProducts(page)
            .then(productData => {
                res.status(200).json(productData);
            })
            .catch((error) => {
                res.status(500).json({ "error": "Something went wrong!" });
            })
    })
    .post("/", (req, res) => {
        const name = req.body.name;
        const price = req.body.price;
        const location = req.body.location;
        createProduct(name, price, location)
            .then(productData => {
                res.status(200).json(productData);
            })
            .catch((error) => {
                res.status(500).json({ "error": "Something went wrong!" });
            })
    })

router.delete("/:id", (req, res) => {
    deleteProduct(req.params.id)
        .then(productData => {
            res.status(200).json(productData);
        })
        .catch((error) => {
            res.status(500).json({ "error": "Something went wrong!" });
        })
})

// router.param("param", (req, res, next, param) => {
// //     I will use this code to sort data later
// })

module.exports = router;