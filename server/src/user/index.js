/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
class UserModule extends KsMf.app.Module {

    /**
     * @description Define your custom url
     *              form more information see: https://github.com/ameksike/ksmf/wiki/Routes
     */
    initConfig() {
        //... prefix:   /api/v1/security
        const prefix = "/api/v1" + this.prefix;
        
        this.routes = [{
            // oauth authorization code: step 1
            route: prefix + "/oauth/connected",
            controller: 'DefaultController',
            action: 'oauthConnect',
            method: 'get'
        },{
            // oauth authorization code: step 2
            route: prefix + "/oauth/response",
            controller: 'DefaultController',
            action: 'oauthResponse',
            method: 'get'
        },  {
            // oauth client credential
            route: prefix + "/oauth/apikey",
            controller: 'DefaultController',
            action: 'oauthApikey',
            method: 'get'
        }];
    }

}
module.exports = UserModule;