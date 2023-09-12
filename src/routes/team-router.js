const { Router } = require("express");
const teamController= require("../controllers/team-controller");

const teamRouter = Router()

teamRouter.post('/', teamController.create);
teamRouter.get('/', teamController.findAll);
teamRouter.get('/:id', teamController.find);
teamRouter.put('/', teamController.update);
teamRouter.delete('/', teamController.delete);

module.exports = teamRouter;