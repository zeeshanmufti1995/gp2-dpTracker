const router = require('express').Router();
const { Park } = require('../../models');

// GET ALL parks route /api/parks
router.get('/', (req,res) => {});

// GET a SINGLE park route /api/parks/:id
router.get('/:id', (req,res) => {});

// POST create a Park route /api/parks
router.post('/', (req,res) => {});

// PUT change Park info route /api/parks/:id
router.put('/:id', (req, res) => {});

// DELETE a Park route /api/parks/:id
router.delete('/:id', (req, res) => {});

module.exports = router;