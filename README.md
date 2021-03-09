# UK-dion-interview

The solution to the realtime problem statement where client communicate with the server at realtime using PUB/SUB channel architecture.

PROBLEM STATEMENT:
-------------------

For this challenge we'll be creating a HTTP notification system. A server (or set of servers) will keep track of topics -> subscribers where a topic is a string and a subscriber is an HTTP endpoint. When a message is published on a topic, it should be
forwarded to all subscriber endpoints.

Running the solution:
---------------------
- git clone https://github.com/Teejayblaze/UK-dion-interview.git
- open terminal or cmd and *cd* into the root directore of the folder in this case would be `UK-dion-interview`
- run `npm install` to install the already saved dependencies.
- open two different termisal or cmd and run `node server.js` on the first terminal and `node client.js` on the second terminal
- use postman or any other Request Client Agent to make the HTTP request as described below
   * POST `/publish/test`
   * Payload `{"url": "http://localhost:9000/subscribe/test", "topic": "test"}`
   * `content-type` should be `application/json`
- note that the configurations can be changed from the available `.env` file.
