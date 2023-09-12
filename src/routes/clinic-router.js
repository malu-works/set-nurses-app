const { Router } = require("express");
const clinicController= require("../controllers/clinic-controller");

const clinicRouter = Router()

clinicRouter.post('/', clinicController.create);
clinicRouter.get('/', clinicController.findAll);
clinicRouter.get('/:id', clinicController.find);
clinicRouter.put('/', clinicController.update);
clinicRouter.delete('/', clinicController.delete);

module.exports = clinicRouter;