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
        //... prefix:   /api/v1/user
        const prefix = "/api/v1" + this.prefix;
        
        this.routes = [{
            route: prefix,
            controller: 'DefaultController',
            method: 'rest'
        }];
    }

}
module.exports = UserModule;