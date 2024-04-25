import express from "express";
import path from "path";
import { connectDB } from "./database/connect.js";
import { User } from "./database/models/userModel.js";

const app = express();
connectDB()


app.use(express.static(path.join(path.resolve(), "/public")));
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(),  "/index.html"))
})

app.get("/register", (req, res) => {
    res.render("register.ejs")
})

app.post("/register", async (req, res) => {
    const {email, password, re_pass} = req.body;

   
    
     if (password === re_pass) {
        await User.create({
            email: email,
            password: password,
        })
        res.render("registerSuccess.ejs")
    }
    else {
        res.render("register.ejs", {error: "Password do not Match"})
    }
})


app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const userExists = await User.findOne({email})
    if (!userExists) {
        res.render("login.ejs", {error: "User do not exist"})
    }
    else if (password === userExists.password){
        res.render("loginSuccess.ejs")
    }
})



app.listen(4000, () => {
    console.log("Server in Running");
})