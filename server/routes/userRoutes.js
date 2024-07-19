const router = require('express').Router();
const { getAllUsers, getUserById, createNewUser, deleteUser, updateUser } = require('../controllers/usersControllers');
const { mustLogin } = require('../controllers/authControllers');

// base path = "/api/users"

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createNewUser)
// router.post('/search', searchInUsers)
router.delete('/:id', mustLogin, deleteUser)
router.patch('/:id', updateUser)


module.exports = router;