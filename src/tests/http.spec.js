const request = require('supertest');
const {getApplication} = require('../application');

describe('Home page should return developer details', function() {


    test("should return an object of developer details and a 200 HTTP status code", (done) => {
        request(getApplication())
            .get('/')
            .expect(200)
            .then(function(response){
                expect(response.body.data.github).toEqual('@chukwuemekaajah');
                expect(response.body.data.email).toBe('talk2ajah@gmail.com');
                done();
            })
    });

});

describe('POST /validate-rule', function() {
    test('responds with json 400 bad request for request body without rule', function(done) {
        request(getApplication())
            .post('/validate-rule')
            .send({name: 'john'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(function(response){
                expect(response.body.message).toEqual('rule is required.')
                done();
            })
    });

    test('responds with json 400 bad request for request body without rule field', function(done) {
        request(getApplication())
            .post('/validate-rule')
            .send({rule:{}})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(function(response){
                expect(response.body.message).toEqual('field is required.')
                done();
            })
    });

    test('responds with json 400 bad request for request body without rule condition', function(done) {
        request(getApplication())
            .post('/validate-rule')
            .send({rule:{field:23, }})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(function(response){
                expect(response.body.message).toEqual('condition is required.')
                done();
            })
    });

    test('responds with json 400 bad request for request body with absent data', function(done) {
        request(getApplication())
            .post('/validate-rule')
            .send({rule:{field:23, condition:'ng', condition_value:32}})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(function(response){
                expect(response.body.message).toEqual('data is required.')
                done();
            })
    });

    test('responds with json 400 bad request for request body with invalid condition', function(done) {
        request(getApplication())
            .post('/validate-rule')
            .send({rule:{field:23, condition:'ng', condition_value:32}, data:'emeka'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(function(response){
                expect(response.body.message).toEqual('condition ng is invalid.')
                done();
            })
    });

    test('responds with json 400 bad request for request body for missing field', function(done) {
        request(getApplication())
            .post('/validate-rule')
            .send({rule:{field:23, condition:'eq', condition_value:32}, data:'emeka'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(function(response){
                expect(response.body.message).toEqual('field 23 is missing from data.')
                done();
            })
    });

    test('responds with json 400 bad request for request body for failed validation', function(done) {
        request(getApplication())
            .post('/validate-rule')
            .send({rule:{field:3, condition:'eq', condition_value:'u'}, data:'emeka'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(function(response){
                expect(response.body.message).toEqual('field 3 failed validation.')
                expect(response.body.data.validation.field_value).toEqual('k');
                done();
            })
    });

    test('responds with json 200 OK request for successful validation', function(done) {
        request(getApplication())
            .post('/validate-rule')
            .send({rule:{field:3, condition:'neq', condition_value:'u'}, data:'emeka'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(function(response){
                expect(response.body.message).toEqual('field 3 successfully validated.')
                expect(response.body.data.validation.field_value).toEqual('k');
                done();
            })
    });
});