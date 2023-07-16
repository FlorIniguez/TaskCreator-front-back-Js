const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes')
const tasksRoutes = require('./routes/taskRoutes')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api',authRoutes);
app.use('/api', tasksRoutes);

module.exports = app;