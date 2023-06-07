const express = require('express')
const app = express()
const port = process.env.PORT
const router = require("./routes/routes")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})