const { Model, DataTypes } = require('sequelize');

class TeamModel extends Model{
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
            tableName: 'teams',
            modelName: 'Teams'
        })
    }
    static associate(models){
        this.belongsTo(models.Clinics, { foreignKey: 'clinicId'});
        this.hasMany(models.Users, { foreignKey: 'teamId'});
    }
}

module.exports = { TeamModel };