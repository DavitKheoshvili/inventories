import { Sequelize, DataTypes, Op, Dialect, Model } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const DB_NAME: string = process.env.DB_NAME as string;
const DB_USER: string = process.env.DB_USER as string;
const DB_DIALECT: Dialect = process.env.DB_DIALECT as Dialect;


const db: Sequelize = new Sequelize(DB_NAME, DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: DB_DIALECT,
    logging: false
});

export default db;