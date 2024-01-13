const { test } = require('@jest/globals');
const request = require('supertest');
let loginToken = "";
let userId = "";

test("Login with good credentials", async () => {
    const response = await request("https://area.mazettt.fr/api/en/auth")
        .post("/login")
        .send({
            email: "test@thomasott.com",
            password: "test123/"
        });
    expect(response.statusCode).toBe(201);
    loginToken = response.body.token;
    userId = response.body.id;
});

test("Get all users", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .get("/user")
        .set('Authorization', 'Bearer ' + loginToken);
    expect(response.statusCode).toBe(200);
});

test("Get all users - bad token", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .get("/user")
        .set('Authorization', 'Bearer ' + loginToken + "bad");
    expect(response.statusCode).toBe(403);
});

test("Get user by id", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .get("/user/" + userId)
        .set('Authorization', 'Bearer ' + loginToken);
    expect(response.statusCode).toBe(200);
});

test("Get user by id - bad token", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .get("/user/" + userId)
        .set('Authorization', 'Bearer ' + loginToken + "bad");
    expect(response.statusCode).toBe(403);
});

test("Get user by id - bad id", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .get("/user/" + "lol")
        .set('Authorization', 'Bearer ' + loginToken);
    expect(response.statusCode).toBe(404);
});

test("Get user profile image missing image", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .get("/user/profile/" + userId)
        .set('Authorization', 'Bearer ' + loginToken);
    expect(response.statusCode).toBe(404);
});

test("Get user profile image - bad token", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .get("/user/profile/" + userId)
        .set('Authorization', 'Bearer ' + loginToken + "bad");
    expect(response.statusCode).toBe(403);
});

test("Get user profile image - bad id", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .get("/user/profile/" + "lol")
        .set('Authorization', 'Bearer ' + loginToken);
    expect(response.statusCode).toBe(404);
});