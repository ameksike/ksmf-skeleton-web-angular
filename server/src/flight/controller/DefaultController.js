/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		25/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');

class DefaultController extends KsMf.app.Controller {

    /**
     * @description get flights
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async list(req, res, next) {
        const list = [
            { id: 666, name: 'Fl Boots' },
            { id: 222, name: 'Fl Clogs' },
            { id: 111, name: 'Fl Loafers' },
            { id: 313, name: 'Fl London' },
            { id: 455, name: 'Fl Sneakers' },
            { id: 645, name: 'Fl Barcelona' },
            { id: 897, name: 'Fl NY' },
            { id: 357, name: 'Fl Havana' },
            { id: 357, name: 'Fl Mio' }
        ];
        res.json({
            page: 1,
            size: list.length,
            total: list.length,
            data: list
        });
    }
}
module.exports = DefaultController;