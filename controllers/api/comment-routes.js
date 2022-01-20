const router = require('express').Router();
const { Comment } = require('../../models');

// GET ALL comments route /api/comments
router.get('/', (req,res) => {});

// GET a SINGLE comment route /api/comments/:id
router.get('/:id', (req,res) => {});

// POST create a Comment route /api/comments
router.post('/', (req,res) => {});

// PUT change Comment info route /api/comments/:id
router.put('/:id', (req, res) => {});

// DELETE a Comment route /api/comments/:id
router.delete('/:id', (req, res) => {});

module.exports = router;