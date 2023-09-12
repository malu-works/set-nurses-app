const { Model, DataTypes } = require('sequelize');

class ClinicModel extends Model{
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
            tableName: 'clinics',
            modelName: 'Clinics'
        })
    }
    static associate(models){
        this.hasMany(models.Teams, { foreignKey: 'clinicId'});
        this.belongsTo(models.Users, { foreignKey: 'userManagerId'});
    }
}

module.exports = { ClinicModel };