const express = require('express');
const redis = require('redis');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const subscriber = redis.createClient({
    port: 6379,
    host: "127.0.0.1"
});
subscriber.on('connect', () => console.log('Connected to Redis Server!'));
subscriber.on('error', (err) => console.log(err.message));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

subscriber.on("message", (channel, message) => {
    console.log("Received data :" + message);
    // res.status(200).json(JSON.parse(message));
});

app.post('/subscribe/:topic', (req, res) => {
    if (req.params.topic) {
        const topic = req.params.topic;
        subscriber.subscribe(topic);
    } else {
        res.send('Apologies, you did not specify the {topic} for this route');
    }
    res.status(200).json(req.body);
});


app.listen(process.env.NODE_CLIENT_PORT, () => {
    console.log("client is listening to port " + process.env.NODE_CLIENT_PORT);
})