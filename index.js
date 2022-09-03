const mongoose = require("mongoose")
const express = require("express")
const authRouter = require('./routes/authRouter')
const reviewsRouter = require('./routes/reviewsRouter')
const trailerRouter = require('./routes/trailerRouter')

const PORT = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config();

const app = express()

app.use(cors()) // include before other routes

app.use(express.json())
app.use('/auth', authRouter)
app.use('/reviews', reviewsRouter)
app.use('/trailer', trailerRouter)

const start = async () => {
  try{
    await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(`Connected to DB`))
    .catch((e) => console.error((e)))
    app.listen(PORT, () => console.log(` Server has been started ${PORT}`))
  } catch(e) {
    console.log(e);
  }
}

start()