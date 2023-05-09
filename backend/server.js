const express = require("express");
const app = express();
const cors = require('cors');
const { generateData } = require("./db.js");
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/generate_random_data", (req, res) => {
  generateData();
  res.status(200).json({ message: "Generated" });
})

const inventoriesRouter = require("./routes/inventories.js");
app.use("/inventories", inventoriesRouter)

app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

app.listen(port);