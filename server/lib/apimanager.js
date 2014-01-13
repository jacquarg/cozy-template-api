Client = require('request-json').JsonClient;
ReuConfig = require('../models/reuconfig');
Config = require('../lib/config');

ReceiptDetail = require('../models/receiptdetail');

module.exports = ApiManager = {

    //# configurez votre domaine (ie: http://www.skerou.com/)
    apiHostname: 'http://localhost:9800/',

    //# configurez votre nom de réutilisateur
    //# (doit être unique sur toute la plateforme, pas d'espace ou de caractère spéciaux)
    // TODO
    reutilisateurID : 'reutilisateurName',

    //# liez des callbacks aux événements qui vous intéressent
    events: {
        'reuconfig.update': 'onConfigChange',
     //   'user.update': 'onInterUpdate',
    },
    
    onConfigChange: function(event, err, config) {
        if (config.id != Config.reutilisateurID) {
            return;
        }
        console.log('conf change');
        //# Ne modifiez pas cette ligne sauf si vous savez ce que vous faites
        this.api.setBasicAuth(config.login, config.password);

        //# Ce callback est un bon moyent de détecter lorsque l'utilisateur enregistre
        //# initialement ses identiants
        //# Vous pouvez par exemple envoyer toutes les DATA déjà présentes
        ReceiptDetail.all(function(err, instances) {
            this.api.post('receiptdetails', instances, function(err, response, body) {
                    if (err != null) {
                        console.log(err);
                    }
                    console.log(response);
                });
        });

        //@ds.post 'request/user/all/', {}, (err, response, docs) ->
        //    # err: contient une éventuelle erreur
        //    # docs: contient un array de chaines JSON représentant tous
        //    #       les doc du doctype souhaité

        //    # Votre requête HTTP ici
    },
};

// Init API :
ApiManager.api = new Client(ApiManager.apiHostname);

ReuConfig.getConfig(function(err, conf) {
    if (conf) {
        ApiManager.api.setBasicAuth(conf.login, conf.password);
    }
});
