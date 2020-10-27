module.exports = (sequelize, Sequelize) =>
  sequelize.define("friends", {
    user_id: {
      type: Sequelize.INTEGER
    },
    friend_id: {
      type: Sequelize.INTEGER
    }
  });
