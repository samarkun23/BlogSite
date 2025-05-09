const User = require('../models/user')
async function signUp(req, res) {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
}

async function signin(req, res) {
    try {
        const { email, password } = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password)

        return res.cookie('token', token).redirect("/")
    } catch (error) {
        return res.render('signin',{
            error: 'Incorrect Email or Password'
        })

    }

}

async function logout(req, res) {
    res.clearCookie('token').redirect("/"); 
}


module.exports = { signUp, signin, logout };














