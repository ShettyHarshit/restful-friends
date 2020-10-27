module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    }
  });

  User.belongsToMany(User, {
    as: "followers",
    foreignKey: "friend_id",
    through: "user_friends"
  });

  User.belongsToMany(User, {
    as: "friends",
    foreignKey: "user_id",
    through: "user_friends"
  });

  return User;
};
