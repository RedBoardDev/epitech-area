import chai from 'chai';
import chaiHttp from 'chai-http';
import { testApp as app } from '../src/index.js';

const { expect } = chai;

chai.use(chaiHttp);

describe('API Tests - basic routes', () => {
    it('should return a 200 status for healthy API on GET /', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res.body).to.have.property('msg', 'Area API');
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('API Tests - auth/login', () => {
    it('should return a 400 status for invalid credentials on POST /auth/login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: '1nval1d_3mail@3xampl3.c0m',
                password: '1nval1dPassw0rd',
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('msg', 'Invalid Credentials');
                done();
            });
    });

    it('should return a 400 status for missing parameters on POST /auth/login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('msg', 'Bad parameter');
                done();
            });
    });
});

describe('API Tests - auth/register', () => {
    it('should return a 400 status for missing parameters on POST /auth/register', (done) => {
        chai.request(app)
            .post('/auth/register')
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('msg', 'Bad parameter');
                done();
            });
    });

    it('should return a 400 status for bad email on POST /auth/register', (done) => {
        chai.request(app)
            .post('/auth/register')
            .send({
                email: 'email',
                password: 'Test1234!',
                lastname: 'Test',
                firstname: 'Test2',
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('msg', 'Bad parameter');
                done();
            });
    });

    it('should return a 400 status for bad password on POST /auth/register', (done) => {
        chai.request(app)
            .post('/auth/register')
            .send({
                email: 'email@example.com',
                password: 'password',
                lastname: 'Test',
                firstname: 'Test2',
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('msg', 'Bad parameter');
                done();
            });
    });
});