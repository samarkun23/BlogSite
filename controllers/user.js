const User = require('../models/user')
async function signUp(req, res) {
    const {fullName, email, password} = req.body;
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/") 
}
module.exports = signUp ;














