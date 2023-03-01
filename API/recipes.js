const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const dotenv = require("dotenv").config();
const URL = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.curjvmw.mongodb.net/`;

const recipes = async (req, res) => {
  try {
    //Connect Mongodb
    const connection = await mongoclient.connect(URL);
    //select db
    const db = connection.db("kitchen_recipe");
    //select collection
    const collection = db.collection("recipes");
    //Do CRUD Operation
    const user = await collection.insertOne(req.body);
    res.json({ message: "Data inserted successfully" });
    //close connection
    await connection.close();
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong.Contact Administrator" });
  }
};

module.exports = recipes;