const { createAccesToken } = require("../libs/jwt");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
  const userFound =  await User.findOne({email})
  if(userFound) return res.status(400).json(
    ['The email is alredy use']
  );
    //encripto
    const passwordHash = await bcrypt.hash(password, 10);
    //creo usuario
    const newUser = new User({
      email,
      password: passwordHash,
      username,
    });

    const userSaved = await newUser.save();
    const token = await createAccesToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createAt: userSaved.createAt,
      updateAt: userSaved.updateAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    //sino encuentra el usuario
    if (!userFound) return res.status(400).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "incorrect password" });
    const token = await createAccesToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createAt: userFound.createAtFound,
      updateAt: userFound.updateAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const logout = async (req,res) => {
 res.cookie('token', '', {expires : new Date(0)} )
 return res.sendStatus(200)
}
const profile = async (req,res) => {
  const userFound = await User.findById(req.user.id)
  if(!userFound) return res.status(404).json({message:'user not found'	});
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createAt : userFound.createdAt,
    updateAt: userFound.updatedAt
  })
  res.send('profile')
}

const verifyToken = async (req,res) => {
 const {token} = req.cookies;
 if(!token) return res.status(401).json({message:'Unauthorized'});
jwt.verify(token, process.env.TOKEN_SECRET, async (err,user)=>{
if(err) return res.status(401).json({message:'Unauthorized'})
const userFound = await User.findById(user.id)
if(!userFound) return res.status(401).json({message:'Unauthorized'})
return res.json({
  id: userFound._id,
  username: userFound.username,
  email: userFound.email,
})
})
}

module.exports = { register, login, logout, profile, verifyToken };
