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

app.get('/project/:id', (req,res) => {
    const id = req.params.id;
    const project = projects.find( project => project.id === id);
    res.render('project', { project });
});

app.listen(3000, ()=>{
    console.log('server is running on port 3000!');
});
