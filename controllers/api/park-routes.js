const router = require('express').Router();
const { Park } = require('../../models');

// GET ALL parks route /api/parks
router.get('/', (req,res) => {
    Park.findAll()
    .then(dbParkData => res.json(dbParkData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET a SINGLE park route /api/parks/:id
router.get('/:id', (req,res) => {
    Park.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbParkData => {
        if (!dbParkData) {
            res.status(404).json({ message: 'No Park found with this id' });
            return;
        }
        res.json(dbParkData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST create a Park route /api/parks
router.post('/', (req,res) => {
    Park.create({
        park_name: req.body.park_name,
        user_id: req.body.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT change Park info route /api/parks/:id
router.put('/:id', (req, res) => {
    Park.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbParkData => {
        if(!dbParkData) {
            res.status(404).json({ message: 'No park found with this id' });
            return;
        }
        res.json(dbParkData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE a Park route /api/parks/:id
router.delete('/:id', (req, res) => {
    Park.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbParkData => {
        if (!dbParkData) {
            res.status(404).json({ message: 'No park found with this id' });
            return;
        }
        res.json(dbParkData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;