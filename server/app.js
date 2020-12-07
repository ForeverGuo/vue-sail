var express = require('express');
var path = require('path');

var app = express();

app.get('/api',(req, res) => {
    console.info(req);
    res.send({status: 200});
})

app.use(express.static(path.join(__dirname, "../dist")));

app.listen('8081',(err) => {
    if(err) {
        console.info(err);
        return;
    }

    console.info('-------服务已启动');
})
