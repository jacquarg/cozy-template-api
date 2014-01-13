americano = require('americano');

config = require('../lib/config');
// TODO import config ?

module.exports = ReuConfig = americano.getModel(
'reuconfig', {
//config.reuConfig(), {
    'id': String,
    'config': Object,
});

ReuConfig.setConfig = function(doc, callback) {
    console.log(doc);

    var reuConf = {
        id : config.reutilisateurID,
        config : doc
    };

    ReuConfig.updateOrCreate(reuConf, callback);

};

ReuConfig.getConfig = function(callback) {
    ReuConfig.find(config.reutilisateurID, function(err, doc) {
        //TODO !
        callback(err, doc.config);
    });  
};
