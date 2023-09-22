import mongoose, { ConnectOptions } from 'mongoose';

const MongoURL:string = process.env.MONGO_URI ?? "mongodb://localhost:27017/quiz"

console.log(MongoURL)
const connectDB = async () => {
    try {
        await mongoose.connect(MongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log("Database is connected");
    } catch (error: any) {
console.log("Error =>",error)
        console.log(error.message);
    }
}

export default connectDB;