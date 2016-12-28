import * as express from "express";
import * as path  from "path";
import * as socket from 'socket.io';
import {Devices} from "./devices.enum";
import {SocketData} from "./SocketData";
import * as ws from 'ws';

class Server {
    public app: express.Application;
    private wss: ws.Server;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.mapStaticFolders();
        this.mapDynamicViews();

        const server = this.app.listen(3000, function () {
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
        this.app.get('/', function (req, res) {
            res.render('index',
                {
                    title: 'Pug Template Demo',
                    message: 'This is dummy paragraph.',
                    players: ['Lukas', 'Tom', 'Fabian']
                }
            );
        });
    }

    private startSocket(server) {
        this.wss = new ws.Server({server: server});

        this.wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                console.log('received: %s', message);

                switch (message.method) {
                    default:
                        this.wss.clients.forEach(c => c.send(message));
                        break;
                }
            });
        });

        // const io = socket(server);
        // io.sockets.on('connection', (connection) => {
        //     console.log('New socket connection: ' + connection.id);
        //     this.connections[connection.id] = connection;
        //
        //     connection.on(Devices.Move.toString(), (data: SocketData) => {
        //         console.log('received message: ', data, data.method, data.data);
        //         switch (data.method) {
        //             default:
        //                 this.sendToAll(Devices.Light, data);
        //                 break;
        //         }
        //     });
        //
        //     connection.on('disconnect', () => {
        //         delete this.connections[connection.id];
        //     })
        // });
    }
}

Server.bootstrap();
