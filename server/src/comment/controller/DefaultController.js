/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');

class DefaultController extends KsMf.app.Controller {

    async init() {
        //... Define logger service as global for his controller
        this.logger = this.helper.get('logger');
        //... Define user service as global for his controller
        this.srvExternal = this.helper.get('MyAPI');
    }

    /**
     * @description get comment list 
     *              see http://localhost:3005/api/v1/doc/
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async list(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const size = req.query.size;
            const filter = req.query.filter;
            const sort = req.query.sort;
            const result = await this.srvExternal.listCommnet(page, size, filter, sort);
            res.json(result);
        } catch (error) {
            this.logger.error('list', error);
            res.status(404).json({
                message: error.message,
                name: error.name
            });
        }
    }

    async select(req, res) {
        const id = req.params['id'];
        const result = await this.srvExternal.selectComment(id);
        res.json(result);
    }

    async insert(req, res) {
        const payload = req.body;
        const result = await this.srvExternal.insertComment(payload);
        this.logger.prefix('Comment.Controller').info('INSERT', result);
        res.json(result);
    }

    async update(req, res) {
        const id = req.params['id'];
        const payload = req.body;
        const result = await this.srvExternal.updateComment({ id, ...payload });
        this.logger.prefix('Comment.Controller').info('UPDATE', result);
        res.json(result);
    }

    async delete(req, res) {
        const id = req.params['id'];
        const result = await this.srvExternal.deleteComment(id);
        this.logger.prefix('Comment.Controller').info('DELETE', result);
        res.json(result);
    }

}
module.exports = DefaultController;