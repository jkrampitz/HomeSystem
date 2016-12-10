/**
 * Created by Joerg on 22.11.2016.
 */

import express = require('express');
var router = express.Router();

/* GET users listing. */
    router.get('/', function (req, res) {
        res.send('User page');
    });
    router.get('/:username', function(req, res){
        var username = req.params.username;
        res.send('User: ' + req.params.username);
    });


export = router;