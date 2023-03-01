const mongodb= require("mongodb")
const mongoclient=mongodb.MongoClient;
const dotenv=require("dotenv").config();

const URL=`mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.curjvmw.mongodb.net/`
const bcrypt=require("bcrypt")

const register=async (req,res)=>{

    try {
        console.log("Before Connection")
        //Connect Mongodb
        const connection=await mongoclient.connect(URL);
        console.log("After Connection")
        //select db
        const db=connection.db("kitchen_recipe");
        //select collection
        const collection=db.collection("app_users")
        //Do CRUD Operation
        const salt= await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(req.body.password,salt);   
        req.body.password=hash;
        delete req.body.Confirm_password;

        const exisiting_users= await collection.findOne({email:req.body.email})
        if(!exisiting_users){
        const operation=await collection.insertOne(req.body)}
        else{
            res.json({error:"User Already Exists"})
        }
        //close connection
        await connection.close();
    
        res.json({"message" : "User Inserted"})
    
    } catch (error) {
        console.log("Error",error);
        res.json({error:"Something went wrong"})
    }
    }

    module.exports=register;