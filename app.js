const express = require('express');

const mongoose = require('mongoose');

const userRoutes = require('./routers/userRouter');

const {PORT = 27017} = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.listen(PORT, ()=>{
  console.log('Сервер запущен на порту', PORT);
});

//id "625aa56746411c03d82ddcdc"