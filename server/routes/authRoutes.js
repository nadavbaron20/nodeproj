const router = require('express').Router();
const { register, login, myProfile } = require('../controllers/authControllers');

// base path "/api/auth"

router.get('/register', register)
router.post('/login', login)
router.post('/profile', myProfile)

module.exports = {
    register,
    login,
    myProfile
};