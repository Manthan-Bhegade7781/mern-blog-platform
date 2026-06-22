const JWT = require("jsonwebtoken");

const secret=process.env.JWT_SECRET;

const createToken=(user)=>{
    const payload={
        id: user._id,
        fullName: user.fullName,
        email:user.email,
        role: user.role
    };

    const token= JWT.sign(payload,secret);

    return token;
}

const validateToken=(token)=>{
    const payload= JWT.verify(token,secret);
    return payload;
}

module.exports={
    createToken,
    validateToken
}