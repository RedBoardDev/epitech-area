const { test } = require('@jest/globals');
const request = require('supertest');

// Login Tests


test("Login with good credentials", async () => {
    const response = await request("https://area.mazettt.fr/api/en/auth")
        .post("/login")
        .send({
            email: "test@thomasott.com",
            password: "test123/"
        });
    expect(response.statusCode).toBe(201);
});

test("Login with bad credentials", async () => {
    const response = await request("https://area.mazettt.fr/api/en/auth")
        .post("/login")
        .send({
            email: "xxxx@test.com",
            password: "test123/"
        });
    expect(response.statusCode).toBe(400);
});