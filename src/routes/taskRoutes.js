const express = require('express');
const { authRequired } = require('../middlewares/validateToken');
const { getTasks, getTask, createTasks, deleteTask, updateTask } = require('../controllers/taskController');
const { validateSchema } = require('../middlewares/validatorMiddleware');
const {createTaskSchema} = require ('../schemas/taskSchema')
const router = express.Router()


router.get('/tasks', authRequired, getTasks)
router.get('/tasks/:id', authRequired, getTask)
router.post('/tasks', authRequired, validateSchema(createTaskSchema),  createTasks)
router.delete('/tasks/:id', authRequired,deleteTask )
router.put('/tasks/:id', authRequired, updateTask )
module.exports = router;