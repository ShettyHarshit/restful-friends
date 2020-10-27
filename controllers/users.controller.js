const db = require("../models");
const User = db.users;

exports.findAll = (req, res) => {
  const pageSize = 10;
  const pageNumber = req.query.page || 1;

  User.findAll({
    limit: pageSize,
    offset: (pageNumber - 1) * pageSize
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      return res.status(500).send(String(error));
    });
};

exports.findFriends = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        as: "friends",
        through: {
          attributes: []
        }
      }
    ]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      return res.status(500).send(String(error));
    });
};

exports.findMutuals = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        include: [
          {
            model: User,
            as: "friends",
            through: {
              attributes: []
            }
          }
        ],
        as: "friends",
        through: {
          attributes: []
        }
      }
    ]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      return res.status(500).send(String(error));
    });
};
