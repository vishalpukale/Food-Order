const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://gofood:gofood@cluster0.7ctlvjh.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongodb = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connection established");

        const collection = mongoose.connection.db.collection("food_items");
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        
        const data = await collection.find({}).toArray();
        const catData = await foodCategory.find({}).toArray();
        
        global.food_items = data;
        global.foodCategory = catData;
        // console.log(global.food_items);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

module.exports = mongodb;
