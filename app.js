const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT||3000
const app = express();

const sessionsRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

//essions router
sessionsRouter.route('/')
    .get((req,res)=>{
        res.send('Hello sessions');
    })

sessionsRouter.route('/1')
    .get((req,res)=>{
        res.send("Hello single session")
    })

app.use('/sessions', sessionsRouter);

app.get('/', (req, res)=>{
    res.render('index', {title: 'Hullbrite', data: ['a', 'b', 'c']});
});

app.listen(PORT, ()=>{
    debug(`Listening on port ${chalk.green(PORT)}`);
});