"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy;
    const location = req.query.location;
    (0, db_1.getAllProducts)(page, sortBy, location)
        .then((productData) => {
        res.status(200).json(productData);
    })
        .catch((error) => {
        res.status(500).json({ error: 'Something went wrong!' });
    });
});
router.post('/', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const location = req.body.location;
    if (name && price && location) {
        (0, db_1.createProduct)(name, price, location)
            .then((productData) => {
            res.status(200).json(productData);
        })
            .catch((error) => {
            res.status(500).json({ error: 'Something went wrong!' });
        });
    }
    else {
        res.status(401).json({ error: 'All fields required!' });
    }
});
router.delete('/:id', (req, res) => {
    (0, db_1.deleteProduct)(parseInt(req.params.id))
        .then((productData) => {
        res.status(200).json(productData);
    })
        .catch((error) => {
        res.status(500).json({ error: 'Something went wrong!' });
    });
});
exports.default = router;
