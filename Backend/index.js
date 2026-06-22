require("dotenv").config();

const express= require("express");
const cors=require("cors");
const {connectionDB}= require("./connection");
const cookieParser = require("cookie-parser");
const path = require("path");


const userRouter= require("./routes/user");
const blogRouter= require("./routes/blog");
const commentRouter = require("./routes/comment");
const { checkForCookieAuthentication } = require("./middleware/authentication");

const app=express();

app.use(
  cors({
    origin:  process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());
app.use(checkForCookieAuthentication("token"));
app.use(express.static(path.resolve("./public")));
app.use(
    "/uploads",
    express.static(
        path.resolve("./public/uploads")
    )
);

connectionDB(process.env.MONGO_URL);

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use("/comment", commentRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server Running on Port 5000");
})