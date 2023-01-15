const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
  {
    postId: { 
      foreignKey: true, 
      type: DataTypes.INTEGER, 
      references: { model: 'BlogPost', key: 'id' },
    },
    categoryId: { 
      foreignKey: true,
      type: DataTypes.INTEGER, 
      references: { model: 'Category', key: 'id' },
    },
  },
  { timestamps: false },
);

PostCategory.associate = (models) => {
  models.Category.belongsToMany(models.BlogPost, {
    as: 'blogposts',
    through: PostCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: PostCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
};

return PostCategory;
};

module.exports = PostCategory;