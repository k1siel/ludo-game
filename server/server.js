const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/add", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body)

  res.end("przeszło kotek")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})