const express = require('express'); //импортируем веб-сервер
const fs = require('fs'); // модуль для работы с файлами


const app = express(); //создаем объект app для работы с http запросами
const cart = require('./cartRouter');//обработчик всех запросов корзины

app.use(express.json());//сервер отправляет данные в формате json
app.use('/', express.static('../public')); //при обращении на главную страницу открываем папку public
app.use('/api/cart', cart);


// app.get();
// app.post();
// app.put();
// app.delete();

app.get('/api/products', (req, res) => {
    fs.readFile('./db/products.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(404, JSON.stringify({
                result: 0,
                text: err
            }));
        } else {
            res.send(data);
        }
    })
});

// app.get('/api/cart/:id', (req, res) => {
//    // res.send(req.params.id);
//     res.send(req.query);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));