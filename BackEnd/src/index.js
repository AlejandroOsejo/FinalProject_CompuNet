import express, { query} from 'express';
import products from './products.js';

const app = express();

app.use(express.json());

ap.get('/products/:id', (req, res) => {
    const {params} = req;
    const {id} = params;
    const {query} = req;

    if(id){
        res.send(products.filter(p => p.id === Number(id)));
    }
});

app.get('/products', (req, res) => {
    res.send(products);
});

app.post('/products', (req, res) => {
    const {body} = req;
    console.log(body);
    products.push(body);
    res.send(products);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});