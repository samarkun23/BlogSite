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

async function signin(req, res) {
    const {email, password} = req.body;
    const user = await User.matchPassword(email,password) 

    console.log(user);
    return res.redirect("/") 

}



module.exports = {signUp,signin} ;














