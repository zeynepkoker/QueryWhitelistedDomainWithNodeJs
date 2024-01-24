const router = require("express").Router()
const Db = require("../models/Db")

router.get("/history", async(req, res) => {
    let allItems = await Db.find()
    allItems = allItems.reverse()
    res.render("history", {items: allItems})
})

module.exports = router