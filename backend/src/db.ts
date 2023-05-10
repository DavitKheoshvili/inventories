import { Sequelize, DataTypes, Op, Dialect, Model } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import Product from './models/product';

const DB_NAME: string = process.env.DB_NAME as string;
const DB_USER: string = process.env.DB_USER as string;
const DB_DIALECT: Dialect = process.env.DB_DIALECT as Dialect;


const sequelize: Sequelize = new Sequelize(DB_NAME, DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: DB_DIALECT,
    logging: false
});

export async function createProduct(name: string, price: number, location: string) {
    await Product.create({ name, price, location }).then(result => {
        console.log("Product Created")
    }).catch(error => {
        console.log("Create error")
    });
    return getAllProducts(1);
}

const pageSize = 20;
export async function getAllProducts(page: number, sortBy: string = "name", location: string = "") {
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

export async function deleteProduct(id: string) {
    const product = await Product.findByPk(id).catch(error => {
        console.log("find");
    });
    if (product) {
        await product.destroy().then().catch(error => {
            console.log("destroy");
        });
    }
    return getAllProducts(1);
}

export async function generateData() {
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
