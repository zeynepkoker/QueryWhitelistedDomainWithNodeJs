const router = require("express").Router()
const Db = require("../models/Db")
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const width = 400
const height = 400
const backgroundColour = 'white'
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour})

const createImage = async (arg1, arg2) => {
    const configuration = {
        type: 'pie',
        data: {
            labels: [
                'Whitelisted: '+ arg1,
                'Not Whitelisted: '+ arg2
              ],
              datasets: [{
                data: [arg1, arg2],
                backgroundColor: [
                  'green',
                  'red'
                ],
                hoverOffset: 4
              }]
        },
    };
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    const stream = chartJSNodeCanvas.renderToStream(configuration);
    return dataUrl;
}

router.get("/", async(req, res) => {
    const queryMessage = req.query.message;
    let message = {}
    let text = "null"
    let status = "null"
    if(queryMessage) {
        text = queryMessage == "valid" ? "Query made and saved successfully!" : ("invalid" ? "Invalid query!" : "Database connection error!")
        status = queryMessage == "valid" ? "Ok" : "Error"
    }
    message = {text: text, status: status}
    const allItems = await Db.find()
    let lastFifty
    if (allItems.length < 50) {
        lastFifty = allItems.reverse()
    }
    else {
        lastFifty = allItems.reverse().slice(0,50)
    }
    let whitelisted = 0
    let notWhitelisted = 0
    lastFifty.forEach(item => {
        if(item.queryResponse == "Whitelisted") {
            whitelisted += 1
        }
        else {
            notWhitelisted += 1
        }
    })
    let graphUrl
    createImage(whitelisted, notWhitelisted)
    .then(data => {
        graphUrl = data
    })
    .then(() => {
        res.render("index", {items: lastFifty, graphUrl: graphUrl, message: message})
    })

})

module.exports = router