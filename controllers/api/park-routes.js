const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Park, Vote, Comment, User } = require('../../models');

// GET ALL parks route /api/parks
router.get('/', (req,res) => {
    Park.findAll({
        // order: [[[sequelize.literal("(SELECT COUNT(*) FROM vote WHERE park.id = vote.park_id)"),"vote_count",], 'DESC']],
        attributes: ['id', 'park_name', [sequelize.literal("(SELECT COUNT(*) FROM vote WHERE park.id = vote.park_id)"),"vote_count",]],
        order: [[sequelize.literal("(SELECT COUNT(*) FROM vote WHERE park.id = vote.park_id)"), 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'park_id', 'user_id', 'created_at']
            }
        ]
    })
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
        },
        attributes: ['id', 'park_name', [sequelize.literal("(SELECT COUNT(*) FROM vote WHERE park.id = vote.park_id)"),"vote_count",]],
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'park_id', 'user_id', 'created_at']
            }
        ] 
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
        park_name: req.body.park_name
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT route to vote on a park /api/parks/upvote
router.put('/upvote', (req,res) => {
    if (req.session) {
        Park.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    } 
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