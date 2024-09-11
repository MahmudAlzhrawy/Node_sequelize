'use-strict'
module.exports=(sequelize,DataTypes)=>{
  const Post=sequelize.define('Post',{
    title:{
      type:DataTypes.STRING,
      allowNull:false,

    },
    content:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    imgUrl:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    categoryId:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false,
    }
  },{})
  Post.associate=(models)=>{
  Post.belongsTo(models.User,{foreignKey:'userId'})
  }
  return Post;
}