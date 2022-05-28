/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');

class TagController extends KsMf.app.Controller {

    async init() {
        //... Define logger service as global for his controller
        this.logger = this.helper.get('logger');
        //... Define user service as global for his controller
        this.srvExternal = this.helper.get('MyAPI');
    }

    /**
     * @description get tag list 
     *              see http://localhost:3005/api/v1/doc/
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async list(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const size = req.query.size;
        const filter = req.query.filter;
        const sort = req.query.sort;
        try {
            const profileData = await this.srvExternal.listTag(page, size, filter, sort);
            res.json(profileData);
        } catch (error) {
            this.logger.error('list', error);
            res.status(404).json({
                message: error.message,
                name: error.name
            });
        }
    }

    /**
     * @description create  a new tag
     *              see http://localhost:3005/api/v1/doc/
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async insert(req, res, next) {
        const payload = req.body;
        const result = await this.srvExternal.insertTag(payload);
        this.logger.prefix('Tag.Controller').info('INSERT', result);
        res.json(result);
    }

}
module.exports = TagController;