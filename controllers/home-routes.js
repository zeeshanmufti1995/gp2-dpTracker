const router = require('express').Router();
const sequelize = require('../config/connection');
const { Park, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
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
    .then(dbParkData => {
        const park = dbParkData.map(park => park.get({ plain:true }));
        res.render('homepage', { park
            // park,
            // loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/park/:id', (req,res) => {
    Park.findOne({
        where: {
            id: req.params.id
        },
        // order: [[[sequelize.literal("(SELECT COUNT(*) FROM vote WHERE park.id = vote.park_id)"),"vote_count",], 'DESC']],
        attributes: ['id', 'park_name', [sequelize.literal("(SELECT COUNT(*) FROM vote WHERE park.id = vote.park_id)"),"vote_count",]],
        // order: [[sequelize.literal("(SELECT COUNT(*) FROM vote WHERE park.id = vote.park_id)"), 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'park_id', 'user_id', 'created_at']
            }
        ]
    })
    .then(dbParkData => {
        const park = dbParkData.map(park => park.get({ plain:true }));
        console.log(park);
        res.render('single-park', { park
            // park,
            // loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;