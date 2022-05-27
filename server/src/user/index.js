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
     * @description define custom url
     */
     initConfig() {
        this.prefix = "/api/v1" + this.prefix;
        super.initConfig();
    }
}
module.exports = UserModule;