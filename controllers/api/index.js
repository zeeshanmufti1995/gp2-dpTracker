const router = require('express').Router();

const commentRoutes = require('./comment-routes');
const parkRoutes = require('./park-routes');
const userRoutes = require('./user-routes');

router.use('/comments', commentRoutes);
router.use('/parks', parkRoutes);
router.use('/users', userRoutes);

module.exports = router;