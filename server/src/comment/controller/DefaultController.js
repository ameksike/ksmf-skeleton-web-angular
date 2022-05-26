/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
const axios = require('axios');
const qs = require('qs');

class DefaultController extends KsMf.app.Controller {

    /**
     * @description get user profile data
     *              see https://tpp.stoplight.io/docs/tropipay-api-doc/ZG9jOjEwMDY4ODg3-getting-started
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async list(req, res, next) {
        try {
            const token = req.header('token');
            const url = this.opt.env.URL_TROPIPAY;

            const profileData = await axios({
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                url: url + "/api/users/profile"
            });
    
            res.json(profileData.data);
        } catch (error) {
            this.logger.error('oauthApikey', error);
            res.status(404).json({
                message: error.message,
                name: error.name
            });
        }
    }

}
module.exports = DefaultController;