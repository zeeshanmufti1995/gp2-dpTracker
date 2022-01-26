const router = require('express').Router();
const sequelize = require('../config/connection');
const { Park, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
// router.get('/', (req,res) => {
//   User.findAll({
//       attributes: { exclude: ['password'] }
//   })
//   console.log("Hello world1")
//   .then(dbUserData => res.json(dbUserData))
//   .catch(err => {
//     console.log("Hello world2")
//       console.log(err);
//       res.status(500).json(err);
//   });
//   console.log("Hello world3")
// });
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'park_id', 'user_id', 'created_at'],
        include: {
          model: Park,
          attributes: ['park_name']
        }
      },
      {
        model: Park,
        attributes: ['park_name'],
        through: Vote,
        as: 'voted_parks'
      }
    ]
  })
    .then(dbUserData => {
      // const user = dbUserData.map(user => user.get({ plain: true }));
      const user = dbUserData.get({ plain: true });
      console.log(user);
      res.render('dashboard', { user, loggedIn: true });
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
