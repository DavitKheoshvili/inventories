const express = require("express");
const { getAllProducts, createProduct, deleteProduct } = require("../db.js");
const router = express();

router
    .get("/", (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const sortBy = req.query.sortBy;
        const location = req.query.location;
        getAllProducts(page, sortBy, location)
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
        if (name && price && location) {
            createProduct(name, price, location)
            .then(productData => {
                res.status(200).json(productData);
            })
            .catch((error) => {
                res.status(500).json({ "error": "Something went wrong!" });
            })
        }else {
            res.status(401).json({ "error": "All fields required!" });
        }
        
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


module.exports = router;