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

    /**
     * @description delete comment by id
     * @param {NUMBER} id 
     * @returns {OBJECT} {
            "data": {
                "id": 12,
                "comment": "14323434",
                "flightId": 2,
                "userId": 1,
                "date": "2022-05-26T07:13:05.822Z"
            }
        }
     */
    deleteComment(id) {
        return this.req({
            url: `/api/v1/comment/${id}`,
            method: 'delete'
        });
    }

    /**
     * @description select comment by id
     * @param {NUMBER} id 
     * @returns {OBJECT} {
            "data": {
                "id": 12,
                "comment": "14323434",
                "flightId": 2,
                "userId": 1,
                "date": "2022-05-26T07:13:05.822Z",
                "user": {
                    "id": 1,
                    "name": "John Doe"
                },
                "tags": [{
                    "id": 1,
                    "name": "Críticos"
                }]
            }
        }
     */
    selectComment(id) {
        return this.req({
            url: `/api/v1/comment/${id}`,
            method: 'get'
        });
    }

    /**
     * @description create comment
     * @param {OBJECT} data 
     * @param {NUMBER} data.comment 
     * @param {NUMBER} data.flightId 
     * @param {NUMBER} data.userId
     * @param {ARRAY} data.tags
     * @returns {OBJECT} {
            "data": {
                "id": 12,
                "comment": "14323434",
                "flightId": 2,
                "userId": 1,
                "date": "2022-05-26T07:13:05.822Z"
            }
        }
     */
    insertComment(data) {
        return this.req({
            url: `/api/v1/comment`,
            method: 'post',
            data
        });
    }

    /**
     * @description update comment
     * @param {OBJECT} data 
     * @param {NUMBER} data.comment 
     * @param {NUMBER} data.flightId 
     * @param {NUMBER} data.userId
     * @param {ARRAY} data.tags
     * @returns {OBJECT} {
            "data": {
                "id": 12,
                "comment": "14323434",
                "flightId": 2,
                "userId": 1,
                "date": "2022-05-26T07:13:05.822Z"
            }
        }
     */
    updateComment(data) {
        return this.req({
            url: `/api/v1/comment/${data.id}`,
            method: 'put',
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
    async listTag(page = 1, size = 10, filter = '', sort = '') {
        return await this.req({
            url: `/api/v1/tag?page=${page}&size=${size}&filter=${filter}&sort=${sort}`,
            method: 'get'
        });
    }
}

module.exports = MyAPI;