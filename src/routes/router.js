const { Router } = require('express');
const userRouter = require('./user-router');
const functionRouter = require('./function-router');
const clinicRouter = require('./clinic-router');
const periodRouter = require('./period-router');
const teamRouter = require('./team-router');
const authController = require('../controllers/auth-controller');
const { verifyToken } = require('../helper/token');

const router = Router();

//public
router.post('/auth', authController.auth);
router.post('/create-account', authController.createAccount);

router.use((req, res, next) => {
    const authHeader = req?.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    verifyToken(token, (err, user) => {
        if (err) return res.sendStatus(403)
        next()
    })
})

//private
router.use('/user', userRouter);
router.use('/function', functionRouter);
router.use('/clinic', clinicRouter);
router.use('/period', periodRouter);
router.use('/team', teamRouter);

module.exports = router;