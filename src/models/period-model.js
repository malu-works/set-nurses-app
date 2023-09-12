const { Model, DataTypes } = require('sequelize');

class PeriodModel extends Model{
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
            tableName: 'periods',
            modelName: 'Periods'
        })
    }
    static associate(models){
        this.hasMany(models.Scales, { foreignKey: 'scaleId'});
    }
}

module.exports = { PeriodModel };