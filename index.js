const express = require("express")
const app = express();

app.get("/testroute", (req, res) => {
    res.send("hello world")
})


app.listen(3000, () => {
    console.log("server is running")
})