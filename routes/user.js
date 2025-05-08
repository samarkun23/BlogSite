const {Router} = require('express');
const signUp = require('../controllers/user');
const router = Router();

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.get('/singin', (req, res) => {
    return res.render('signin')
})

router.post("/signup", signUp)

module.exports = router;










