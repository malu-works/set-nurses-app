const { Router } = require("express");
const userController = require("../controllers/user-controller");

const userRouter = Router()

userRouter.post('/', userController.create)
userRouter.get('/', userController.findAll);
userRouter.get('/:id', userController.find);
// userRouter.put('/', userController.update);
// userRouter.delete('/', userController.delete);

module.exports = userRouter;