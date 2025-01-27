const Users = require("../models/Users");
const User = require("../models/Users");
// Get all users
const submitSignup = async (requestAnimationFrame, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const newEntry = new Users({ name, email, password, phone });
        await newEntry.save();
        res.status(200).send({ message: 'Account created successfully' })
    }
    catch (error) {
        res.status(500).send({ message: 'Error signing up' })
    }
}
module.exports = { getAllUsers };