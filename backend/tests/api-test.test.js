const { test } = require('@jest/globals');
const request = require('supertest');

const sum = (a, b) => a + b;


// Login Tests

const auth_url = "https://area.thomasott.fr/api/";
const error_code = 404;
let randomised_mail = Math.random().toString(36).substring(2, 11) + "@test.com";

test('Login - Invalid credentials', async () => {
    const response = await request(auth_url)
        .post('auth/login')
        .send({
            email: "test@test.com",
            password: "invalidstuff"
        });
    expect(response.statusCode).toBe(error_code);
});

test('Register - Random infos', async () => {
    const response = await request(auth_url)
        .post('/fr/auth/register')
        .send({
            email: randomised_mail,
            firstname: "Le",
            lastname: "Testeur",
            password: "test123/"
        });
    expect(response.statusCode).toBe(201);
});
