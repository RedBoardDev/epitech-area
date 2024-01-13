const { test } = require('@jest/globals');
const request = require('supertest');

const randomemail = Math.random().toString(36).substring(2, 15) + "@test.com";

test("Register with good credentials", async () => {
    const response = await request("https://area.mazettt.fr/api/en/auth")
        .post("/register")
        .send({
            email: randomemail,
            password: "test123/",
            firstname: "test",
            lastname: "leotest"
        });
    expect(response.statusCode).toBe(201);
});

test("Register with bad credentials", async () => {
    const response = await request("https://area.mazettt.fr/api/en/auth")
        .post("/register")
        .send({
            email: "zzzz",
            password: "test123/",
            firstname: "test",
            lastname: "leotest"
        });
    expect(response.statusCode).toBe(400);
});

test("Register with existing email", async () => {
    const response = await request("https://area.mazettt.fr/api/en/auth")
        .post("/register")
        .send({
            email: "test@thomasott.com",
            password: "test123/",
            firstname: "test",
            lastname: "leotest"
        });
    expect(response.statusCode).toBe(400);
});