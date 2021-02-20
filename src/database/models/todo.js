const TodoModel = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'Todo',
    {
      title: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      priority: {
        type: DataTypes.INTEGER,
        references: { model: 'Priority', key: 'id' },
      },
    },
    {}
  );
  Todo.associate = (models) => {
    Todo.belongsTo(models.Priority, {
      foreignKey: 'priority',
      onDelete: 'CASCADE',
    });
  };
  return Todo;
};

export default TodoModel;
