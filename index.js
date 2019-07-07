// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.status = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello world');
// });

// server.listen(3000, () => {
//     console.log('Server on port 3000');
// });

const express = require('express');
const app = express();
const morgan = require('morgan');

// function logger(req, res, next) {
//     console.log(`Route received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// };

//Settings
app.set('appName', 'Express tutorial');
app.set('port', '3000');
app.set('view engine', 'ejs');

//Middlewares
app.use(express.json());
// app.use(logger);
app.use(morgan('dev'));

// app.all('/user', (req, res, next) => {
//     console.log('Por aquí pasó ');
//     // res.send('Terminado');
//     next();
// });

app.get('/', (req, res) => {
    const data = [{name: 'Joe'}, {name: 'John'}, {name: 'Lee'}, {name: 'Joel'}];
    res.render('index.ejs', {people: data});
});

app.get('/user', (req, res) => {
    res.json({
        username: "Mel",
        lastname: "Skywalker"
    });
});

app.post('/user/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send('Petición POST recibida');
});

app.post('/about', (req, res) => {
    res.send('Petición POST recibida');
});

app.put('/user/:id', (req, res) => {
    console.log(req.body);
    res.send(`Usuario ${req.params.id} actualizado`);
});

app.delete('/user/:id', (req, res) => {
    res.send(`Usuario ${req.params.id} ha sido eliminado`);
});

app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Server on port', app.get('port'));
});