const { Router } = require("express");
const functionController= require("../controllers/fuction-controller");

const functionRouter = Router()

functionRouter.post('/', functionController.create);
functionRouter.get('/', functionController.findAll);
functionRouter.get('/:id', functionController.find);
functionRouter.put('/', functionController.update);
functionRouter.delete('/', functionController.delete);

module.exports = functionRouter;