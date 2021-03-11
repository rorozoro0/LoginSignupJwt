const express = require('express');
const router = express.Router();
const app = express();
const usersRouter = require('./routes/UserRoutes');

app.use(express.json());

app.use('/api/user', usersRouter);

app.use('/', router);
router
  .route('/')
  .get((req, res)=>{
    res.json({msg:'Connection sucess'});
  })
module.exports = app;