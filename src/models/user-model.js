const { Model, DataTypes } = require('sequelize');

class UserModel extends Model{
    static init(database){
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING
        },{
            timestamps: true,
            sequelize: database,
            tableName: 'users',
            modelName: 'Users'
        })
    }
    static associate(models){
        this.belongsTo(models.Functions, { foreignKey: 'functionId'});
        this.belongsTo(models.Teams, { foreignKey: 'teamId'});
        this.hasMany(models.Clinics, { foreignKey: 'userManagerId'});
    }
}

module.exports = { UserModel };