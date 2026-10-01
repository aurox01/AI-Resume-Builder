import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully")
        })

        let mongodbURI = process.env.MONGODB_URI;
        if (!mongodbURI || mongodbURI.includes("-------")) {
            mongodbURI = "mongodb://127.0.0.1:27017/resume-builder";
        }

        const projectName = 'resume-builder';

        if (mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1)
        }

        if (!mongodbURI.includes('/resume-builder')) {
            mongodbURI = `${mongodbURI}/${projectName}`;
        }

        await mongoose.connect(mongodbURI)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

export default connectDB;