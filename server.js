var americano = require('americano');
//var watcher = ;

var port = process.env.PORT || 9250;
americano.start({name: 'bookmark', port: port} , 
    function(app, server) {
        require('./server/services/watcher')(server);
    }
);
