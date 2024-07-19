const router = require('express').Router();
const { getAllCards, getCardById, createNewCard, searchInCards, deleteCard, updateCard } = require('../controllers/cardsControllers');
const { mustLogin, allowedRoles } = require('../controllers/authControllers');

// base path "/api/cards"

router.get('/', mustLogin, allowedRoles(['business', 'admin']), getAllCards)
router.get('/:id', getCardById)
router.post('/', mustLogin, createNewCard)
router.post('/search', searchInCards)
router.delete('/:id', deleteCard)
router.patch('/:id', updateCard)


module.exports = router;