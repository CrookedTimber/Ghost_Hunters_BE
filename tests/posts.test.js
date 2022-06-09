const request = require('supertest');
const server = require('../scripts/server');


describe('API endpoints', () => {

    let api
    beforeAll(() => {
        api = server.startServer(5000, 'localhost', 'Test server running on port 5000');
    });

    afterAll(done => {
        console.log('stopping test server');
        api.close(done)
    })

    it('responds to /', done => {
        request(api)
            .get('/')
            .expect(200, done);
    });

    it('responds to GET /posts', done => {
        request(api)
            .get('/posts')
            .expect(200, done);
    });

    it('responds to DELETE /posts', done => {
        request(api)
            .delete('/posts')
            .expect(204, done);
    });

    it('404 everything else', done => {
        request(api)
            .get('/bob')
            .expect(404, done);
    });


    // test('Test Function', () =>{
    //     expect(function()).toBe(true);
    // })



});