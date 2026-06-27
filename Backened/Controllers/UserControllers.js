const User = require("../Models/UserModel")


const CurrentUser = async (req, res) => {
    try {
        const userid = req.userid

        const user = await User.findById(userid)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Current User Successfullyy found',
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

const CurrentAdmin = async (req, res) => {
    try {

        const adminemail = req.adminemail;

        if (!adminemail) {
            return res.status(401).json({
                success: false,
                message: "Admin Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            email: adminemail,
            role: "admin"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};





module.exports = { CurrentUser, CurrentAdmin }