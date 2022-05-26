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
     * @param {NUMBER} offset 
     * @param {NUMBER} limit 
     * @param {STRING} criteria 
     * @return {OBJECT} {
            "page": 2,
            "per_page": 6,
            "total": 12,
            "total_pages": 2,
            "data": [{
                "id": 7,
                "email": "michael.lawson@reqres.in",
                "first_name": "Michael",
                "last_name": "Lawson",
                "avatar": "https://reqres.in/img/faces/7-image.jpg"
            }]
     */
    async getUsers(offset = 0, limit = 10, criteria = '') {
        return await this.req({
            url: `/api/users?page=${offset}`,
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
}

module.exports = MyAPI;