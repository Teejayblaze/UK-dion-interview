const express = require('express');
const redis = require('redis');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const publisher = redis.createClient({
    port: 6379,
    host: "127.0.0.1"
});
publisher.on('connect', () => console.log('Connected to Redis Server!'));
publisher.on('error', (err) => console.log(err.message));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.post('/publish/:topic', (req, res) => {
    const payload = req.body;
    if (req.params.topic) {
        const topic = req.params.topic;
        axios.post(process.env.BASE_URL + ':' + process.env.NODE_CLIENT_PORT + '/subscribe/' + topic, payload).then(resp => {
            publisher.publish(topic, JSON.stringify(payload));
            res.json(resp.data).status(200);
        }).catch(err => res.json({status: 'error', message: err.message}));
    } else {
        res.send('Apologies, you did not specify the {topic} for this route');
    }

    res.sent('sent').status(200);
});


app.listen(process.env.NODE_SERVER_PORT, () => {
    console.log('Server app started and now listening on port ' + process.env.NODE_SERVER_PORT);
});