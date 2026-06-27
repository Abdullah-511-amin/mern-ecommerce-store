
const jwt = require('jsonwebtoken')

const GenerateToken = (userid) => {
    try {
        const token = jwt.sign({id:userid},process.env.JWT_SECRET,{expiresIn:'7d'})
        return token
    } catch (error) {
        console.log(error)
    }
}


const GenerateToken1 = (email) => {
    try {
        const token = jwt.sign(
            {id: email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return token;
    } catch (error) {
        console.log(error);
    }
};

const CompareToken = (token) => {
    try {
        const isMatch = jwt.verify(token,process.env.JWT_SECRET)
        return isMatch
    } catch (error) {
        console.log(error)
    }
}

module.exports = {GenerateToken,CompareToken,GenerateToken1}