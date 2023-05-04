const express = require("express");
const router = express();

router
    .get("/", (req, res) => {
        res.status(200).json({ message: "inventory get for show data" });
    })
    .post("/", (req, res) => {
        res.status(200).json({ message: "inventory post for create data" });
    })

router.delete("/:id", (req, res) => {
    console.log(req.params.id);
    res.status(200).json({ message: `inventory delete. user with id=${req.params.id}` });
})

// router.param("param", (req, res, next, param) => {
// //     I will use this code to sort data later
// })

module.exports = router;