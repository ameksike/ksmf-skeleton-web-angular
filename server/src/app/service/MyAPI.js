/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/03/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * @require     SrvAPI
 * */
const SrvAPI = require('./SrvAPI');

class MyAPI extends SrvAPI {

    constructor() {
        super(process.env.MyAPI_URL || 'http://localhost:3005');
    }

    /**
     * @description get user list 
     * @param {NUMBER} page 
     * @param {NUMBER} size 
     * @param {OBJECT|STRING} filter 
     * @param {ARRAY|STRING} sort 
     * @return {OBJECT} {
            "page": 2,
            "size": 6,
            "total": 12,
            "data": [{
                "id": 7,
                "name": "Michael"
            }]
     */
    async getUsers(page = 1, size = 10, filter = '', sort = '') {
        filter = typeof (filter) === 'string' ? filter : JSON.stringify(filter);
        sort = typeof (sort) === 'string' ? sort : JSON.stringify(sort);
        return await this.req({
            url: `/api/v1/user?page=${page}&size=${size}&filter=${filter}&sort=${sort}`,
            method: 'get'
        });
    }

    /**
     * @description create user
     * @param {OBJECT} data 
     * @param {NUMBER} data.age 
     * @param {STRING} data.name 
     * @param {STRING} data.job
     * @returns {OBJECT} {
            "name": "morpheus",
            "job": "leader",
            "id": "629",
            "createdAt": "2022-05-19T03:08:32.718Z"
        }
     */
    async addUser(data) {
        return await this.req({
            url: "/api/users",
            method: 'post',
            data
        });
    }

    /**
     * @description get comments list  
     *              http://localhost:3005/api/v1/doc/
     * @param {NUMBER} page 
     * @param {NUMBER} size 
     * @param {OBJECT|STRING} filter 
     * @param {ARRAY|STRING} sort 
     * @returns {OBJECT}
     */
    async listCommnet(page = 1, size = 10, filter = '', sort = '') {
        return await this.req({
            url: `/api/v1/comment?page=${page}&size=${size}&filter=${filter}&sort=${sort}`,
            method: 'get'
        });
    }
}

module.exports = MyAPI;