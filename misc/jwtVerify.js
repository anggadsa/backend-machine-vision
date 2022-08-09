const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verify =  async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1];
            const jwt_payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // console.log(jwt_payload)
            const userChecking = await User.findOne( { 
                where: {  
                    id: jwt_payload.id,
                    email: jwt_payload.email,
                } 
            })
            if(!userChecking) throw new Error('Data not found')
            req.user = jwt_payload
            next()
        } else {
            throw new Error(`No token auth`)
        }

    } catch (error) {
        const splitError = error.message.split(" ")[0]
        if(splitError === "jwt") {
            error.message = 'Expired Token';
        } else if (splitError === "Unexpected" || splitError === "invalid" ){
            error.message = 'Invalid Token';
        }
        return res.status(401).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

module.exports = verify