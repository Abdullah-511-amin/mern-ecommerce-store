const { CompareToken } = require("../Config/token");

const isAuth = async (req, res, next) => {
    try {
        
        const token = req.cookies.token;

       
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access Denied: Token not found'
            });
        }

        
        const isverify = CompareToken(token);

        
        if (!isverify) {
            return res.status(401).json({
                success: false,
                message: 'Access Denied: Invalid or expired token'
            });
        }

       
        req.userid = isverify.userid || isverify.id;

       
        next();

    } catch (error) {
        console.log("isAuth Middleware Error:", error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

module.exports = isAuth;