const express=require("express");
const app=express();
const mongodb= require("mongodb")
const mongoclient=mongodb.MongoClient;
const dotenv=require("dotenv").config();
const cors=require("cors");
const URL=`mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.curjvmw.mongodb.net/`
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");

const register = require("./API/register");
const login = require("./API/login");
const authenticate = require("./API/authenticate");
const recipes=require("./API/recipes");
const getrecipes=require("./API/getrecipes")

app.use(express.json());

app.use(cors({
    origin:"*"}))

app.post("/register",register)

app.post("/login",login)

app.post("/recipes",recipes)

app.get("/recipes",getrecipes)

app.listen(process.env.PORT || 8000);