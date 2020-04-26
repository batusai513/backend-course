'use strict';
const { hash, compare } = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password_hash: DataTypes.STRING,
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          isLongEnough: function (val) {
            if (val.length < 7) {
              throw new Error('Please choose a longer password');
            }
          },
        },
      },
    },
    {}
  );

  User.login = function login(email, password) {
    return User.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (!user) {
        throw new Error('not found');
      }
      return user.verifyPassword(password).then((valid) => {
        if (valid) {
          return user;
        }
        return null;
      });
    });
  };

  User.prototype.verifyPassword = function (password) {
    return compare(password, this.password_hash).then((match) => {
      if (!match) {
        throw new Error('password not match');
      }
      return match;
    });
  };

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task, {
      as: 'tasks',
    });
  };
  User.beforeCreate((user, options) => {
    // bcrypt.hash
    return hash(user.password, 10).then(function afterHash(hash) {
      user.password_hash = hash;
    });
  });
  return User;
};
