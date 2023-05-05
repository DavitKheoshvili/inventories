const express = require("express");
const app = express();
const { getAllProducts } = require("./db.js");

async function dbConnect() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

app.get("/", (req, res) => {
    dbConnect();
    res.status(200).json({ message: "main page" });
})

const inventoriesRouter = require("./routes/inventories.js");

app.use("/inventories", inventoriesRouter)

app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

app.listen(3000);