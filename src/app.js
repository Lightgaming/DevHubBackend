'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const { Docker } = require('node-docker-api');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/list", (req, res) => {
    console.log(docker.container.list());
});

app.post("/new", (req, res) => {
    docker.container.create({
        Image: 'ubuntu',
        name: 'test'
    })
        .then(container => container.start())
});

app.get("/export", (req, res) => {

});

app.listen(3030, () => {
    console.log("Server running on 3030!");
})