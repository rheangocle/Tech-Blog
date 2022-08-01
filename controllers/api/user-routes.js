const router = require('express').Router();
const { User } = require('../../models');

// Post to login
router.post('./login', (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({
        message: "There is no account with that username, please try again."
      });
      return;
    }

    const userPassword = await userData.checkPassword(req.body.password);

    if (!userPassword) {
      res.status(400).json({
        message: "Incorrect password, please try again."
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.sesstion.logged_in = true;

      res.json({
        user: userData,
        message: "You are now logged in!"
      });
    });
  } catch (err) {
    res.status(400).json.apply(err)
  }
});

// Post to logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;