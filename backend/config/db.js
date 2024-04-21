import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.mongo_URI);
        console.log('MongoDB connected to host '+conn.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;