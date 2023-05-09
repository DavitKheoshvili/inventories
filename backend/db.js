const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
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
async function getAllProducts(page, sortBy = "name", location = "") {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const where = location ? { location: { [Op.eq]: location } } : {};
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

async function updateProduct(id, name, price, location) {
    const product = await Product.findByPk(id);
    await product.update({ name, price, location });
}

async function deleteProduct(id) {
    const product = await Product.findByPk(id);
    await product.destroy();
    return getAllProducts(1);
}

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
        } catch (err) {
            console.error('Error inserting data:', err);
            return;
        }
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    generateData
};