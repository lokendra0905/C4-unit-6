const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { userRouter } = require("./Routes/userRoutes")
const cors = require('cors');

const { connection } = require("./db")

require("dotenv").config()

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
// app.use("/post", postRoutes);

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log(`Server is running on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }

})
