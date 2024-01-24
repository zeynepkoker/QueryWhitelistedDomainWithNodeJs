const router = require("express").Router()
const axios = require("axios")
const spawnSync = require("child_process").spawnSync

const baseUrl = 'https://otx.alienvault.com/api/v1/indicators/domain/'
const Db = require("../models/Db")

router.post("/query", (req, res) => {
    const queryName = req.body.input
    axios.get(baseUrl+queryName)
    .then(response => {
        const isWhitelisted = response.data.validation.find((item) => item.source === "whitelist");
        let queryResponse = ""
        if (isWhitelisted) {
            queryResponse = "Whitelisted"
        } 
        else {
            queryResponse = "Not Whitelisted"
        }
        const pythonProcess = spawnSync('python3', [
            'scripts/dns_enumeration.py',
            queryName,
        ]);
        const dns_enumeration_result = pythonProcess.stdout?.toString()?.trim();
        const dns_enumeration_array = dns_enumeration_result.split("\r\n")
        let dns_enumeration_A = ""
        let dns_enumeration_AAAA = "";
        let dns_enumeration_MX = "";
        dns_enumeration_array.forEach(item => {
            const recordType = item.split("---")[0]
            const result = item.split("---")[1]
            if(recordType == "A"){
                dns_enumeration_A = result
            }
            else if(recordType == "AAAA"){
                dns_enumeration_AAAA = result
            }
            else {
                dns_enumeration_MX = result
            }
        })
        const newDbItem = new Db({queryName, queryResponse, dns_enumeration_A, dns_enumeration_AAAA, dns_enumeration_MX,})
        newDbItem.save()
        .then(() => {
            console.log("Successfully added to db")
            res.redirect("/?message=valid")
        })
        .catch(err => {
            console.log(err)
            res.redirect("/?message=dberror")
        })
        
    })
    .catch(err => {
        console.log(err)
        res.redirect("/?message=invalid")
    })
})

module.exports = router