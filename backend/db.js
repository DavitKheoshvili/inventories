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

function generateData() {
    const num_rows = 50;
    const data = [];
    for (let i = 1; i <= num_rows; i++) {
        data.push({
            name: Math.random().toString(36).substring(2, 12),
            price: Math.floor(Math.random() * 100) + 1,
            location: Math.random().toString(36).substring(2, 12),
        });
    }
    console.log(data);
    // Insert data into table
    Product.bulkCreate(data)
        .then(() => {
            console.log(`Inserted ${num_rows} rows into TestTable`);
        })
        .catch((err) => {
            console.error('Error inserting data:', err);
        })
        
}


module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    generateData
};