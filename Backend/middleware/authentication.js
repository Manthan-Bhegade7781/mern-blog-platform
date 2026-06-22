const {validateToken}= require('../services/auth')

const checkForCookieAuthentication = (cookieName)=>{

    return (req,res,next)=>{
        const tokenvalue= req.cookies[cookieName];

        if(!tokenvalue){
            return next();
        }

        try {
            const userPayLoad= validateToken(tokenvalue);
            req.user=userPayLoad;

        } catch (error) { 
            console.log("JWT ERROR =", error.message);
        }

        return next();
    }

}

module.exports={
    checkForCookieAuthentication,
}