import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({extends:true}))
app.use(cors());
app.use(cookieParser())

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server connected to port : ${PORT}`);
});

//
