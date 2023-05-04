const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('postgres://user:newuser:5432/test') // Example for postgres

const sequelize = new Sequelize('test', 'newuser', 'newpassword', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

// Define a model for the table
const Product = sequelize.define('Product', {
    // Define the columns of the table
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Product.sync()
//     .then(() => {
//         console.log('Table created successfully!');
//     })
//     .catch((error) => {
//         console.error('Error creating table:', error);
//     });

async function createProduct(name, price, location) {
    const product = await Product.create({ name, price, location });
    return getAllProducts();
}

async function getAllProducts() {
    const products = await Product.findAll();
    const productData = products.map(product => product.get({ plain: true }));
    return productData;
}

async function updateProduct(id, name, price, location) {
    const product = await Product.findByPk(id);
    await product.update({ name, price, location });
}

async function deleteProduct(id) {
    const product = await Product.findByPk(id);
    await product.destroy();
    return getAllProducts();
}
module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct
};