const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

// Register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (checkUser)
          return res.json({
            success: false,
            message: "User Already exists with the same email! Please try again",
          });
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword,
        });
        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'You are registered as a new User!',
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Some error occurred',
        });
    }
};

//login 
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        const checkUser = await User.findOne({ email });
        if(!checkUser)
            return res.json({
                success: false,
                message: "User not found! Please try again",
            });
        const comparePassword = await bcrypt.compare(password, checkUser.password);
        if(!comparePassword) return res.json({
            success: false,
            message: "Incorrect Password! Please try again",
        })

        const token = jwt.sign({
            id: checkUser._id,
            role : checkUser.role,
            email: checkUser.email,
            },'CLIENT_SECRET_KEY',{expiresIn: '24h'});
        
        res.cookie('token', token, {httpOnly:true, secure : false}).json({
            success: true,
            message: "You are logged in successfully",
            user:{
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName : checkUser.userName,
            }
        })
        
    } catch (e){
        res.status(500).json({
            success: false,
            message: 'Some error occurred',
        });
    }
}

//logout 
const logoutUser = async (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "You are logged out successfully",
    })
}

//auth middleware
const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success: false,
        message: "You are not authenticated! Please login to continue",
    })
    try{
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    }catch(e){
        console.log(e);
        res.status(401).json({
            success: false,
            message: "You are not authenticated! Please login to continue",
        })
    }
}

module.exports = { registerUser, loginUser ,logoutUser  , authMiddleware};
