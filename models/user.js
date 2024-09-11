'use strict';
module.exports = (sequelize, DataTypes) => {
 const User= sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    role: DataTypes.STRING,
    schoolName: DataTypes.STRING,
    major: DataTypes.STRING,
    studyingYear: DataTypes.STRING,
    matrial: DataTypes.STRING
  },{})
  return User;
};