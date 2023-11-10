const User = require("../models/userschema");
const JTW = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registre = async (req, res) => {
  try {
    console.log("Received registration request:", req.body);
    const { name, email, password } = req.body;
    const userexist = await User.findOne({ email });
    if (userexist) {
      console.log("User with this email already exists:", email);
      res.status(400).json({ msg: "This email is already in use" });
    } else {
      const poswordcry = await bcrypt.hash(password, 10);
      const usercreate = await User.create({
        name,
        email,
        password: poswordcry,
      });
      console.log("User registered:", usercreate);
      const token = await JTW.sign(
        { id: usercreate._id },
        process.env.JWT,
        // secretKey, // Use the secret key you generated
        { expiresIn: "7D" }
      );
      res.status(200).json({ msg: usercreate, token: token });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {

  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      res.status(400).json({ msg: "This email does not exist" });
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        existUser.password
      );
      if (isPasswordValid) {
        const token = await JTW.sign(
          { id: existUser._id },
          process.env.JWT,
          // secretKey, // Use the secret key you generated
          { expiresIn: "7D" }
        );
        res.status(200).json({
          msg: "Account login successful",
          user: {
            name: existUser.name,
            email: existUser.email,
          },
          token:token
        });
      } else {
        res.status(500).json({ msg: "Invalid password" });
      }

    }
  } catch (error) {
    res.status(500).json({msg:"Something went wrong"})
  }
};
const getuserdata = async (req, res) => {
  try {
    const { userid } = req.body;
    const user = await User.findOne({ _id: userid });
    if (!user) {
      res.status(400).json({ msg: "no user found" });
    } else {
      res.status(200).json({ msg: "getuser", user: user });
    }
  } catch (error) {
    res.status(500).json({ msg: "error", error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ msg: "Authorization token is required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid token" });
      }

      const userId = decoded.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }

      if (email !== user.email) {
        const emailInUse = await User.findOne({ email });
        if (emailInUse) {
          return res.status(400).json({ msg: "Email is already in use by another user" });
        }
      }

      // Update the user data
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      const updatedUser = await user.save();

      res.status(200).json({ msg: "User updated successfully", user: updatedUser });
    });
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { registre, login, getuserdata,updateUser };
