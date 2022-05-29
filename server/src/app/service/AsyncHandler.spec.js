/**
 * @description AsyncHandler test
 * @test npx jest ./src/app/service/AsyncHandler.spec.js
 */
const KsMf = require('ksmf');
//... load system
const app = new KsMf.app.WEB(__dirname + "/../../../").init();
//... load targets
const srvAsyncHandler = app.helper.get({
    name: 'AsyncHandler',
    path: 'service',
    module: 'app',
    dependency: {
        helper: 'helper'
    }
});
const srvMyAPI = app.helper.get({
    name: 'MyAPI',
    path: 'service',
    module: 'app',
    dependency: {
        helper: 'helper'
    }
});

//... define tests
describe('UNIT_TEST_AsyncHandler', () => {
    it('Fetch URLs', async done => {
        const MAX_CONCURRENCY = 3;
        const URLS = [
            'http://localhost:3005/api/v1/user/1',
            'http://localhost:3005/api/v1/tag/3',
            'http://localhost:3005/api/v1/comment/20',
            'http://localhost:3005/api/v1/tag/2',
            'http://localhost:3005/api/v1/user/2',
            'http://localhost:3005/api/v1/comment/21',
            'http://localhost:3005/api/v1/user/3'
        ];
        const res = await srvAsyncHandler.fromList(
            URLS,
            (url, method = 'get') => srvMyAPI.req({ url, method }),
            MAX_CONCURRENCY
        );
        expect(srvMyAPI).toBeInstanceOf(Object);
        expect(res.threads).toBe(MAX_CONCURRENCY);
        expect(res.result.length).toBe(URLS.length);
        done();
    });
});