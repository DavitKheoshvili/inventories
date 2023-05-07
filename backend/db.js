const { Sequelize, DataTypes } = require('sequelize');

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
    return getAllProducts(1);
}

const pageSize = 20;
async function getAllProducts(page) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const { count, rows } = await Product.findAndCountAll({ offset, limit });
    const totalPages = Math.ceil(count / pageSize);
    const data = rows.map((row) => row.dataValues);
    return { data, totalPages };
}

async function updateProduct(id, name, price, location) {
    const product = await Product.findByPk(id);
    await product.update({ name, price, location });
}

async function deleteProduct(id) {
    const product = await Product.findByPk(id);
    await product.destroy();
    return getAllProducts(1);
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