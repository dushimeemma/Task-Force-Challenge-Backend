const PriorityModel = (sequelize, DataTypes) => {
  const Priority = sequelize.define(
    'Priority',
    {
      status: { type: DataTypes.STRING },
    },
    {}
  );
  Priority.associate = (models) => {
    Priority.hasMany(models.Todo, { foreignKey: 'priority' });
  };
  return Priority;
};

export default PriorityModel;
