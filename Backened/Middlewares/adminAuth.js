const { CompareToken } = require("../Config/token");

const adminAuth = async (req, res, next) => {
    try {

        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Not Found"
            });
        }

        const decoded = CompareToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });
        }

        req.adminemail = decoded.id;

        next();

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = adminAuth;