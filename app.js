const express = require('express');
const { projects } = require('./data/data.json');

const app = express();
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req,res) => {
    res.render('index', { projects });
});

app.get('/about', (req,res) => {
    res.render('about');
});

app.get('/project/:id', (req,res,next) => {
    const id = req.params.id;
    const project = projects.find( project => project.id === id);
    if(project === undefined) {
        next();
    }
    res.render('project', { project });
});

app.use( (req, res, next) => {
    const err = new Error('The page you were looking for is not available ...');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.render('error');
});

app.listen(3000, ()=>{
    console.log('server is running on port 3000!');
});
