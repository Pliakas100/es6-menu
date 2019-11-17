const express = require('express')
const app = express()
const port = 3000

app.use(express.static('views'));
app.use(express.static('public'));
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/data', (req, res) => res.json({data: [['Shoes',
    'New collection',
    'Running',
    'Football',
    ],
    ['Clothing',
    'T-shirts',
    'Jeans',
    'Jackets',
    ],
    ['Accesories',
    'Underwear',
    'Socks',
    'Backpacks',
    ]]}));

app.listen(port, () => console.log(`The app is running`))