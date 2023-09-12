const { Model, DataTypes } = require('sequelize');

class FunctionModel extends Model{
    static init(database){
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.TEXT,
            description: DataTypes.TEXT
        },{
            timestamps: true,
            sequelize: database,
            tableName: 'functions',
            modelName: 'Functions'
        })
    }
    static associate(models){
        this.hasMany(models.Users, { foreignKey: 'functionId'});
    }
}

module.exports = { FunctionModel };