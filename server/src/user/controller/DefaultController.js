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
     * @description controller initialization method
     *              see https://tpp.stoplight.io/docs/tropipay-api-doc/ZG9jOjE4Njc1NzYz-integration-intro
     */
    init() {
        this.logger = this.helper.get('logger').prefix('Security.DefaultController');
    }

    /**
     * @description oauth authorization code: step 1
     *              see https://tpp.stoplight.io/docs/tropipay-api-doc/ZG9jOjI3NDE0MjMx-authorization-code-with-pkce
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     */
    async oauthConnect(req, res) {
        //... load enviroment vars
        const url_terminal = this.opt.env.URL_TERMINAL;
        const url_tropipay = this.opt.env.URL_TROPIPAY;
        
        const oauth_authorize = url_tropipay + this.opt.env.OAUTH_URL_AUTHORIZE;
        const redirect_uri = url_terminal + this.opt.env.OAUTH_REDIRECT_URI;
        
        const client_id = this.opt.env.OAUTH_CLIENT_ID;
        const client_secret = this.opt.env.OAUTH_CLIENT_SECRET;
        const scope = this.opt.env.OAUTH_SCOPE;
        const state = this.opt.env.OAUTH_STATE;
        const code_challenge = this.opt.env.OAUTH_CODE_CHALLENGE;
        const code_challenge_method = this.opt.env.OAUTH_CODE_CHALLENGE_METHOD;

        //... fromat request params
        const param = qs.stringify({
            response_type: "code",
            client_id,
            client_secret,
            redirect_uri,
            code_challenge,
            code_challenge_method,
            state,
            scope
        });

        //... redirect to oauth authorize url
        res.redirect(oauth_authorize + "?" + param);
    }

    /**
     * @description oauth authorization code: step 2
     *              see https://tpp.stoplight.io/docs/tropipay-api-doc/ZG9jOjI3NDE0MjMx-authorization-code-with-pkce
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     */
    async oauthResponse(req, res) {
        try {
            //... load enviroment vars
            const url_terminal = this.opt.env.URL_TERMINAL;
            const redirect_uri = url_terminal + this.opt.env.OAUTH_REDIRECT_URI;
            const client_id = this.opt.env.OAUTH_CLIENT_ID;
            const client_secret = this.opt.env.OAUTH_CLIENT_SECRET;
            const scope = this.opt.env.OAUTH_SCOPE;
            const state = this.opt.env.OAUTH_STATE;
            const code_verifier = this.opt.env.OAUTH_CODE_VERIFIER;

            //... verify the state value
            if (req.query['state'] !== state) {
                this.logger.error('NOT secure, the state value not match');
            }

            //... confifure options for get authorization code
            const param = {
                grant_type: "authorization_code",
                code: req.query['code'],
                client_id,
                client_secret,
                redirect_uri,
                code_verifier,
                scope
            };

            //... save authorization code 
            const token = await axios.post(oauth_token, param);

            //... save token in cookies
            if(res.cookie && req.cookies){
                const old = req.cookies.session ? (typeof (req.cookies.session) === 'string' ? JSON.parse(req.cookies.session) : req.cookies.session) : {};
                const ses = {
                    ...old,
                    ...token.data
                };
                res.cookie('session', JSON.stringify(ses), {
                    maxAge: 86400000
                });
                this.logger.info('session', ses);
            }

            //... return the app
            const from = '/auth/session';
            res.redirect(url_terminal + from);
        } catch (error) {
            this.logger.error("Error", error);
            res.end('OAUTH: Not authorize');
        }
    }

    /**
     * @description oauth client credential
     *              see https://tpp.stoplight.io/docs/tropipay-api-doc/ZG9jOjI3NDE0MjMw-client-credentials
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     */
    async oauthApikey(req, res) {
        const client_id = this.opt.env.OAUTH_CLIENT_ID;
        const client_secret = this.opt.env.OAUTH_CLIENT_SECRET;
        const scope = this.opt.env.OAUTH_SCOPE;
        const url = this.opt.env.URL_TROPIPAY + this.opt.env.OAUTH_URL_TOKEN;
    
        //... confifure options for get authorization code
        const param = {
            grant_type: "client_credentials",
            client_id,
            client_secret,
            scope
        };
        try{
            //... save authorization code 
            const response = await axios.post(url, param);
            this.logger.info('oauthApikey', response.data);
            res.json(response.data);
        }
        catch(error){
            this.logger.error('oauthApikey', error);
            res.status(404).json({
                message: error.message,
                name: error.name
            });
        }
    }
}
module.exports = DefaultController;