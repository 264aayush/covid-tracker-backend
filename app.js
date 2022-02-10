const express = require('express');
const bodyparser = require('body-parser');
const appRouter = require('./routes/appRouter');



const port = process.env.PORT || 8080

let app = express()
const cors=require('cors')
app.use(cors())
app.use(bodyparser.json())
app.use('/', appRouter)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})