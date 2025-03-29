import mongoose from "mongoose";

const ConnectDB = async () => {
    mongoose.connection.on('connected',()=>{
        console.log("DB connected")
    })

await mongoose.connect(`${process.env.MongoDB_URL}/ecommerce`)
}
export default ConnectDB;