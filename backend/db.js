"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateData = exports.deleteProduct = exports.getAllProducts = exports.createProduct = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_DIALECT = process.env.DB_DIALECT;
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: DB_DIALECT,
    logging: false
});
// Define a model for the table
const Product = sequelize.define('Product', {
    // Define the columns of the table
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
});
async function createProduct(name, price, location) {
    const product = await Product.create({ name, price, location });
    return getAllProducts(1);
}
exports.createProduct = createProduct;
const pageSize = 20;
async function getAllProducts(page, sortBy = "name", location = "") {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const where = location ? { location: { [sequelize_1.Op.eq]: location } } : {};
    const { count, rows } = await Product.findAndCountAll({
        offset,
        where,
        order: [[sortBy, 'ASC']],
        limit
    });
    const totalPages = Math.ceil(count / pageSize);
    const data = rows.map((row) => row.dataValues);
    return { data, totalPages, totalItems: count };
}
exports.getAllProducts = getAllProducts;
async function deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (product) {
        await product.destroy();
    }
    return getAllProducts(1);
}
exports.deleteProduct = deleteProduct;
async function generateData() {
    const num_rows = 300000;
    const batch_size = 1000;
    const locations = [
        'მთავარი ოფისი',
        'კავეა გალერია',
        'კავეა თბილისი მოლი',
        'კავეა ისთ ფოინთი',
        'კავეა სითი მოლი'
    ];
    let i = 0;
    while (i < num_rows) {
        const data = [];
        for (let j = 1; j <= batch_size && i < num_rows; j++) {
            data.push({
                name: Math.random().toString(36).substring(2, 12),
                price: Math.floor(Math.random() * 100) + 1,
                location: locations[Math.floor(Math.random() * locations.length)]
            });
            i++;
        }
        try {
            await Product.bulkCreate(data);
            console.log(`Inserted ${data.length} rows into Products`);
        }
        catch (err) {
            console.error('Error inserting data:', err);
            return;
        }
    }
}
exports.generateData = generateData;
