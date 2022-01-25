const router = require('express').Router();
const sequelize = require('../config/connection');
const { Park, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Park.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'park_name',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE park.id = vote.park_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'park_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbParkData => {
      const parks = dbParkData.map(park => park.get({ plain: true }));
      res.render('dashboard', { parks, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Park.findByPk(req.params.id, {
    attributes: [
      'id',
      'park_name',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE park.id = vote.park_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'park.id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbParkData => {
      if (dbParkData) {
        const park = dbParkData.get({ plain: true });
        
        res.render('edit-park', {
          park,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
