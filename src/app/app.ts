/**
 * Created by Joerg on 19.11.2016.
 */

///<reference path="../../typings/index.d.ts"/>

'use strict';

import * as express from "express";
import * as path  from "path";
import userRouter = require("./routes/user");
var socket = require('socket.io');


class Server {
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.mapStaticFolders();
        this.mapDynamicViews();

        var server = this.app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });
        this.startSocket(server);
    }

    private mapStaticFolders() {
        this.app.use('/public', express.static(path.join(__dirname + '/../public')));
    }

    private mapDynamicViews() {
        this.app.set("view engine", "pug");
        this.app.set('views', path.join(__dirname, '/../views'));
        this.app.use('/user', userRouter);
        this.app.get('/', function (req, res) {
            res.render('index',
                { title: 'Pug Template Demo',
                message:'This is dummy paragraph.',
                players: ['Lukas', 'Tom', 'Fabian']}
                );
        });
    }

    private startSocket(server) {
        var io = socket(server);
        io.sockets.on('connection', function (connection) {
            console.log('New socket connection: ' + connection.id);

            connection.on('inputData', function(data){
                console.log('recieved: ' + data.value);
                var response = {
                    value: 'Data recieved'
                };
                connection.emit('inputValue', response);
                // connection.broadcast.emit('inputValue', response); //sendet an andere clients

            });
        });
    }


}

Server.bootstrap();
