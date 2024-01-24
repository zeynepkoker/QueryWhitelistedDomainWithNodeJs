const express = require("express")
const mongoose = require("mongoose")
const path = require('path')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/sparta').
  catch(error => console.log(error));

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs")

app.use(require("./routes/index"))
app.use(require("./routes/query"))
app.use(require("./routes/history"))

app.listen(3000, () => console.log("Server listening on port 3000"))