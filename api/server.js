const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const objectId = require('mongodb').ObjectId;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server is running');
});

const db = new mongodb.Db(
    'instagram',
    new mongodb.Server('localhost', 27017, {}),
    {}
);

app.get('/', (req, res) => {
    res.send({ msg: 'Hello world!' })
});

app.get('/api/:id', (req, res) => {
    db.open((error, mongoclient) => {
        mongoclient.collection('posts', (error, collection) => {
            collection.find(objectId(req.params.id)).toArray((err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(result);   
                }
            });
        });
    })
});

app.get('/api', (req, res) => {
    db.open((error, mongoclient) => {
        mongoclient.collection('posts', (error, collection) => {
            collection.find().toArray((err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(result);   
                }
            });
        });
    })
});

app.post('/api', (req, res) => {
    const data = req.body;

    db.open((error, mongoclient) => {
        mongoclient.collection('posts', (error, collection) => {
            collection.insert(data, (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(result);   
                }
            });
        });
    })
});

app.put('/api', (req, res) => {
    
});

app.delete('/api', (req, res) => {
    
});