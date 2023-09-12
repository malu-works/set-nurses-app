const { Router } = require("express");
const periodController= require("../controllers/period-controller");

const periodRouter = Router()

periodRouter.post('/', periodController.create);
periodRouter.get('/', periodController.findAll);
periodRouter.get('/:id', periodController.find);
periodRouter.put('/', periodController.update);
periodRouter.delete('/', periodController.delete);

module.exports = periodRouter;