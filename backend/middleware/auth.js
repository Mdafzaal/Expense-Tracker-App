import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "mySuperSecretKeyAfzaal@123";

export default async function authMiddleware(req, res, next) {
    // grap the token
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            success:false,
            message:"Not authrized or token missing"
        });
    }
    const token = authHeader.split(" ")[1];

    // to verify the token
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(401).json({
            success: false,
            message: "Token invalid or expired"
        });
        
    }
}
