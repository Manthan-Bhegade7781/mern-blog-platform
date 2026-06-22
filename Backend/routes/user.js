const express= require("express");
const User = require("../models/user");

const router= express.Router();

router.post('/signup', async (req,res)=>{
    const{ fullName, email, password}= req.body;
    await User.create({
        fullName,
        email,
        password
    });

    return res.status(201).json({
            message: "User created successfully",
    });
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await User.matchPasswordAndGenerateToken(
            email,
            password
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
        });

    } catch (error) {
        return res.status(401).json({
            error: "Incorrect Email or Password"
        });
    }
});


router.get('/me',(req,res)=>{
    if(!req.user){
        return res.status(401).json({
            message:"Not Logged In"
        });
    }

    return res.status(200).json({
        user:req.user,
    });
});

router.get("/logout",(req,res)=>{

    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });
    return res.json({
        message:"Logged Out"
    });
});

module.exports=router;