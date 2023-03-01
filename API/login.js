const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const URL = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.curjvmw.mongodb.net/`;
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    //Connect Mongodb
    const connection = await mongoclient.connect(URL);
    //select db
    const db = connection.db("kitchen_recipe");
    //select collection
    const collection = db.collection("app_users");
    //Do CRUD Operation

    const user = await collection.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
      const compare = await bcrypt.compare(req.body.password, user.password);
      console.log(compare)
      if (compare) {
        //Generate Token
        const token = jwt.sign({ email: user.email }, process.env.SECRET, {
          expiresIn: "20m",
        });
        console.log(token);
        res.json({ message: "email/password matches successfully", token });
      } else {
        res.json({ message: "email/password does not match" });
      }
    } else {
      res.json({ error: "User does not exist" });
    }
    //close connection
    await connection.close();
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong.Contact Administrator" });
  }
};

module.exports = login;
