import validator from 'validator'
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
// Add to register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Missing details" });
    }

    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a correct email" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Enter a strong password (min 8 characters)" });
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        const user = await newUser.save();

        // Generate a token
        const token = createToken(user._id);

        // Send response with token
        return res.status(201).json({ success: true, token });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Add to login user
const loginUser = async(req,res) =>{
    try{
        const{email,password}=req.body;
        const user = await  userModel.findOne({email})
        if(!user){
           return  res.json({success:false,message:'user does not exist'})
        }
        const ismatch =  await bcrypt.compare(password,user.password)
        if(ismatch){
        const token = createToken(user._id)
        res.json({success:true,token})
        }else{
            res.json({success:false,message:'invalid credentials'})
        }
            }catch(error)
            {
                console.log(error)
                res.json({ success: false, message: error.message })
            }
        }

// Admin Login
const adminUser = async(req,res) =>{
    try{
const{email,password} =  req.body;
if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
{
    const token = jwt.sign(email + password,process.env.JWT_SECRET)
    res.json({sucess:true,token})
}else{
    res.json({sucess:false,message:"Invalid Credentials"})
}

}catch(error){
    console.log(error)
    res.json({ success: false, message: error.message })
    }
}

export{registerUser,loginUser,adminUser}