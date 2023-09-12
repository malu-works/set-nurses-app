const { Sequelize } = require('sequelize');
const confgDatabase = require('./config');

const { UserModel } = require('../models/user-model');
const { FunctionModel } = require('../models/function-model');
const { ScaleModel } = require('../models/scale-model');
const { TeamModel } = require('../models/team-model');
const { ClinicModel } = require('../models/clinic-model');
const { PeriodModel } = require('../models/period-model');

const database = new Sequelize(confgDatabase)

UserModel.init(database);
FunctionModel.init(database);
ScaleModel.init(database);
TeamModel.init(database);
ClinicModel.init(database);
PeriodModel.init(database);

UserModel.associate(database.models);
FunctionModel.associate(database.models);
ScaleModel.associate(database.models);
TeamModel.associate(database.models);
ClinicModel.associate(database.models);
PeriodModel.associate(database.models);

database.authenticate().then(() => {
    console.log("Conectado ao banco")
}).catch((error) =>{
    console.error('Erro na conexão: ', error)
});

module.exports = database;