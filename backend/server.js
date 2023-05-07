const express = require("express");
const app = express();
const cors = require('cors');
const { generateData } = require("./db.js");
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// async function dbConnect() {
//     try {
//         await db.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }

// app.get("/", (req, res) => {
//     dbConnect();
//     res.status(200).json({ message: "main page" });
// })
app.get("/generate_random_data", (req, res) => {
  generateData();
  res.status(200).json({ message: "Generated" });
})


const inventoriesRouter = require("./routes/inventories.js");
app.use("/inventories", inventoriesRouter)

app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

app.listen(3000);