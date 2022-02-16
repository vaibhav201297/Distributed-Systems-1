'use-strict'
const path = require('path');
const supertest = require("supertest");
const server = require(path.join(__dirname,'../server/server.js'));

const port = 6789
server.listen(port, (error) => {
    if (error) {
        console.error('Error starting server: ', error);
    } else {
        console.log(`Server started at http://localhost:${port}`);
    }
})

describe('Server Testing', () => {

    test("Heartbeat Test - GET /", async () => {
        await supertest(server).get("/").expect(200)
    });
    
})