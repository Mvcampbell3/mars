const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

function createHashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function signToken(data) {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: '7d' })
}

function checkToken(token, res) {
  jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
    if (err) {
      return res.json({ ...err, valid: false });
    }
    return res.json({ ...decoded, valid: true });
  });
}

module.exports = {
  findAllUsers: function(req, res) {
    db.User.find({})
      .select('-password')
      .then(users => res.json(users))
      .catch(err => res.json(err));
  },

  createUser: function(req, res) {
    const { email, password } = req.body;
    const hash = createHashPassword(password);
    db.User.create({ email, password: hash })
      .then(result => res.json(result))
      .catch(err => res.json(err))
  },

  deleteUser: function(req, res) {
    const id = req.params.id;
    db.User.deleteOne({ _id: id })
      .then(result => res.json(result))
      .catch(err => res.json(err))
  },

  loginUser: function(req, res) {
    const { email, password } = req.body;
    db.User.findOne({ email })
      .then(dbUser => {
        if (dbUser) {
          const matchedPassword = bcrypt.compareSync(password, dbUser.password);
          if (matchedPassword) {
            const token = signToken({ email: dbUser.email, id: dbUser._id })
            return res.json({ ok: true, token })
          }
          return res.json({ ok: false })
        }
        return res.json({ ok: false, user: false })
      })
      .catch(err => {
        console.log(err)
        res.json(err)
      })
  },

  checkUserToken: function(req, res) {
    const { token } = req.body;
    checkToken(token, res);
  }
}