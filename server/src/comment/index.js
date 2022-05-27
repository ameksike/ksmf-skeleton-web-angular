/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
class CommentModule extends KsMf.app.Module {
    /**
     * @description Define your custom url
     *              form more information see: https://github.com/ameksike/ksmf/wiki/Routes
     */
    initConfig() {
        const prefix = "/api/v1";

        this.routes = [{
            //... /api/v1/comment
            route: prefix + this.prefix,
            controller: 'DefaultController',
            method: 'rest'
        },{
            //... /api/v1/tag
            route: prefix + '/tag',
            controller: 'TagController',
            method: 'rest'
        }];
    }
}
module.exports = CommentModule;