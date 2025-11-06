import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/Hospital_Management_System`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        writeConcern: {
        w: 'majority'
        }
    })

}

export default connectDB;
