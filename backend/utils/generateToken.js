import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) =>{
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET,{expiresIn: "15d"});

    res.cookie("jwt-netflix", token,{
        maxAge: 15*24*60*60*1000, //15 days in mili-second
        httpOnly : true, //prevent xss attacks cross-site scripting attacks, make it not be accessed by js
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        secure: ENV_VARS.NODE_ENV !== "development",
    });

    return token;
};