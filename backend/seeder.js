import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";
import users from "./data/user.js";

dotenv.config();

connectDB();

const importData =  async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const admin = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return {...product, user: admin };
        })

        await Product.insertMany(sampleProducts);

        console.log("Data Imported".green.inverse);
        process.exit();

    } catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(1)
    }
}

const destroyData = async () => {
   try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        process.exit();

    } catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(1)
    }  
}

if(process.argv[2] == '-i') {
    importData();
}else {
    destroyData();
}