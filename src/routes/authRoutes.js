const express = require('express');
const { register, login, logout, profile ,verifyToken} = require('../controllers/authController');
const { authRequired } = require('../middlewares/validateToken');
const {registerSchema, loginSchema} = require('../schemas/authSchema')
const { validateSchema } = require('../middlewares/validatorMiddleware');;
const router = express.Router()

router.post('/register',validateSchema(registerSchema), register)
router.post('/login',validateSchema(loginSchema) ,login)
router.post('/logout', logout)
router.get('/verify', verifyToken)
router.get('/profile', authRequired, profile)
module.exports = router;