const express = require('express');
const { projects } = require('./data/data.json');

const port = process.env.PORT || 3000;

const app = express();
//starting static server and serving static files
app.use('/static', express.static('public'));
//setting pug to handle templating
app.set('view engine', 'pug');

//rendering homepage
app.get('/', (req,res) => {
    res.render('index', { projects });
});

//rendering about page
app.get('/about', (req,res) => {
    res.render('about');
});

//rendering project pages
app.get('/project/:id', (req,res,next) => {
    const id = req.params.id;
    const project = projects.find( project => project.id === id);
    //handling page not found error
    if(project === undefined) {
        next();
    }
    res.render('project', { project });
});

//handling 404 error
app.use( (req, res, next) => {
    const err = new Error('The page you were looking for is not available ...');
    err.status = 404;
    //passing the 404 to global error handler after its setup above
    next(err);
});

//handling global errors with error page
app.use((err, req, res, next) => {
    res.locals.error = err;
    console.error(err);
    res.render('error');
});

app.listen(port, ()=>{
    console.log('server is running on port 3000!');
});