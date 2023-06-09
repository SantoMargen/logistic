
const express = require('express')
const app = express()
const port = 3001
const routes = require("./routes/routes")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})