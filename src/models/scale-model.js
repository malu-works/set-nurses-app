const { Model, DataTypes } = require('sequelize');

class ScaleModel extends Model{
    static init(database){
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            date: DataTypes.DATE
        },{
            timestamps: true,
            sequelize: database,
            tableName: 'sacales',
            modelName: 'Scales'
        })
    }
    static associate(models){
        this.belongsTo(models.Users, { foreignKey: 'scaleId'});
    }
}

module.exports = { ScaleModel };