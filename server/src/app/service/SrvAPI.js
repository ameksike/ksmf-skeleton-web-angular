/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/03/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * @require     axios
 * */
const axios = require('axios');
class SrvAPI {

    constructor(url = '') {
        this.token = '';
        this.base = url;
    }

    /**
     * @description set configuration options 
     * @param {OBJECT} data 
     * @param {STRING} data.token 
     */
    set(data) {
        this.token = data && data.token ? data.token : this.token;
        return this;
    }

    /**
     * 
     * @param {OBJECT} options 
     * @param {OBJECT} options.headers
     * @param {STRING} options.url 
     * @param {STRING} options.method 
     * @param {OBJECT} options.data 
     */
    async req(options) {
        options = options || {};
        axios.defaults.adapter = require('axios/lib/adapters/http');
        const headers = Object.assign({
            'Authorization': this.token
        }, options.headers || {});
        const opt = {
            headers,
            url: /https{0,1}:\/\//.test(options.url) ? options.url : this.base + options.url,
            method: options.method || 'post',
            data: options.data || {}
        }
        try {
            const result = await axios(opt);
            return {
                data: result.data
            };
        } catch (error) {
            return {
                error: error.message || error
            }
        }
    }

    /**
     * 
     * @param {OBJECT} payload 
     * @param {STRING} payload.client_id 
     * @param {STRING} payload.client_secret 
     * @param {STRING} payload.redirect_uri 
     * @param {STRING} payload.code_verifier
     * @param {STRING} payload.scope 
     * @param {STRING} payload.code 
     * @return {OBJECT} {
     *      data: {
     *          token: STRING
     *      }
     * } 
     */
    async getAuthorization(payload) {
        //... confifure options for get authorization code
        const data = {
            grant_type: "authorization_code",
            ...payload
        };
        return await this.req({
            url: "/api/v2/access/authorize",
            method: 'post',
            data
        });
    }
}

module.exports = SrvAPI;