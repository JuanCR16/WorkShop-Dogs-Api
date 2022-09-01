const express = require('express');
const router = express.Router();

const { findAllBreed, findByBreedAndSubBreed } = require('../controllers/dogController');

router.get('/', findAllBreed);
router.get('/breed', findByBreedAndSubBreed);

module.exports = router