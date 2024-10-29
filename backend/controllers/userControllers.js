import asyncHandlers from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../config/generateToken.js";


const registerUser = asyncHandlers(async (req, res) => {
    const { name, email, password, pic } = req.body;

    // Check for required fields
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter All Required Details");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    // Log the user object to verify creation
    console.log("Created User:", user);

    // Respond with success message and user details if creation is successful
    if (user) {
        return res.status(201).json({
            message: "Profile created successfully.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
            },
            success: true
        });
    } else {
        res.status(400);
        throw new Error("Failed To Create User!");
    }
});



const authUser = asyncHandlers(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user);
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

const allUser = asyncHandlers(async (req, res) => {
    const searchRegex = new RegExp(req.query.search, "i");
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
            ],
        }
        : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

export { registerUser, authUser, allUser };