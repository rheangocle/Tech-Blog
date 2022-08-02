const router = require('express').Router();
const { User } = require('../models');
//const withAuth = require('../utils/auth');

//add withAuth to route
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ['password']
      },
      order: [['name', 'ASC']],
    });

    const users = userData.map((user) => user.get({
      plain: true
    }));

    res.render('home', {
      users,
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

// add get route for session login

module.exports = router;