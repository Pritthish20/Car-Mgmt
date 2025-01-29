import jwt from "jsonwebtoken";

export const generateToken=(res,userId)=> {
    const token =jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn: "6h",
    });
    // console.log("Token generated",token);
    // set jwt as http-only cookie
    res.cookie("jwt",token,{
        // httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 6*60*60*1000,
    });

    return token;
};