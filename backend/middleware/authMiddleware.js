import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import asyncHandlers from "express-async-handler";

const protect = asyncHandlers(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, Token Failed !");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized, Token Failed !");
    }
});
export { protect };