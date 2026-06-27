const { GenerateToken, GenerateToken1 } = require("../Config/token")
const User = require("../Models/UserModel")
const bcrypt = require('bcrypt')

const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        console.log(username, email, password)
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all fields'
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be atleast 6 characters'
            })
        }

        const isExist = await User.findOne({ email })

        if (isExist) {
            return res.status(400).json({
                success: false,
                message: 'User already exist try another email or username'
            })
        }

        const hashpass = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashpass
        })

        const token = GenerateToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(201).json({
            success: true,
            message: 'User Create Successfullyy',
            user: {
                username: user.username,
                email: user.email,
                id: user._id
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!password || !email) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all fields'
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not Found'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Password is Incorrect'
            })
        }

        const token = GenerateToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: 'User Signin Successfullyy',
            user: {
                username: user.username,
                email: user.email,
                id: user._id
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}

const Logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const GoogleLogin = async (req, res) => {
    try {
        const { name, email } = req.body
        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({
                email,
                username: name
            })
        }

        const token = GenerateToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: 'User Login Successfulyy',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}



const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = GenerateToken1(email);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Admin Login Successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


module.exports = { Register, Login, Logout, GoogleLogin, adminLogin }