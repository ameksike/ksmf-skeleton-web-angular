/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		28/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
class AsyncHandler {
    /**
     * @description asynchronously perform a list of tasks with the same handler
     * @param {ARRAY} tasks 
     * @param {FUNCTION} handler 
     * @param {NUMBER} limit 
     * @returns 
     */
    fromList(tasks, handler, limit = 3) {
        if (!tasks || !tasks.length || typeof (handler) !== 'function') {
            return false;
        }
        const list = Object.assign([], tasks);
        const result = [];
        let pending = 0;
        let threads = 0;
        return new Promise((resolve, reject) => {
            //... queue tasks
            function next(data, id) {
                result.push(data);
                pending--;
                if (list.length) {
                    worker(id);
                } else {
                    if (!pending) {
                        resolve({ threads, result });
                    }
                }
            }
            //... perform task from queue
            function worker(id) {
                const item = list.shift();
                if (item) {
                    pending++;
                    threads = threads < pending ? pending : threads;
                    return handler(item)
                        .then(data => next(data, id))
                        .catch(error => next(error, id));
                } else {
                    if (!pending) {
                        resolve({ threads, result });
                    }
                }
            }
            //... create workers 
            for (let i = 0; i < limit; i++) {
                worker(i);
            }
        });
    }
}

module.exports = AsyncHandler;