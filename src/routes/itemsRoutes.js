const express = require('express');
const checkUser = require('../middlewares/common');

const router = express.Router();

const {
  renderProfile,
  renderForm,
  submitForm,
  deleteItem,
  editForm,
  submitEditForm,
  submitBidForm,
  deleteItemFetch,
  renderItem,
  addBidtoItem,
} = require('../controllers/itemsControllers');

router.get('/', checkUser, renderProfile);
router.get('/new', checkUser, renderForm).post('/new', checkUser, submitForm);
router.get('/:id/edit', checkUser, editForm).post('/:id/edit', checkUser, submitEditForm);
router.get('/:id/delete', checkUser, deleteItem);
router.delete('/:id', checkUser, deleteItemFetch);
router.post('/bid/:id', checkUser, submitBidForm);
router.get('/:id', renderItem);
router.post('/:id/bid', checkUser, addBidtoItem);
module.exports = router;


