const express = require("express");
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/User");


userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, gender, password } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        bcrypt.hash(password, 5, async (err, hash) => {
            const newUser = new UserModel({ email, name, gender, password: hash })
            await newUser.save()
            return res.status(200).json({ message: "New User Registered" })
        })


    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found Please Login" })
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ course: "backend" }, "masai")
                return res.status(200).json({ message: "Login Successful", token })
            } else {
                return res.status(400).json({ message: "Wrong Crediential" })
            }
        })


    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

module.exports = { userRouter };