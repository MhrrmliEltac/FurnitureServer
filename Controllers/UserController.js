const User = require("../Models/UserModel");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Bütün sahələri doldurun!" });
    }
    let isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: "İstifadəçi uğurla yaradıldı!", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server xətası!", error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server xətası!", error: err.message });
  }
};

module.exports = { createUser, getUsers };
