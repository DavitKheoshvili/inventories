const express = require("express");
const app = express();


app.get("/", (req, res) => {
    res.status(200).json({ message: "main page" });
})

const inventoriesRouter = require("./routes/inventories.js");

app.use("/inventories", inventoriesRouter)

app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

app.listen(3000);