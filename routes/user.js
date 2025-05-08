const {Router} = require('express');
const {signUp, signin} = require('../controllers/user');
const router = Router();

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.get('/signin', (req, res) => {
    return res.render('signin')
})

router.post("/signup", signUp)

router.post('/signin', signin)


module.exports = router;










