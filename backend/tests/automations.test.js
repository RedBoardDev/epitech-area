const { test } = require('@jest/globals');
const request = require('supertest');
let loginToken = "";
let userId = "";
let serviceId = "";

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

test("Get all automations", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .get("/automations")
        .set('Authorization', 'Bearer ' + loginToken);
    expect(response.statusCode).toBe(200);
});

test("Get all automations - bad token", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .get("/automations")
        .set('Authorization', 'Bearer ' + loginToken + "bad");
    expect(response.statusCode).toBe(403);
});

test("Get automation by id", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .get("/automations/" + 1)
        .set('Authorization', 'Bearer ' + loginToken);
    expect(response.statusCode).toBe(200);
});

test("Add automation", async () => {
    const response = await request("https://area.mazettt.fr/api/en")
        .post("/automations")
        .set('Authorization', 'Bearer ' + loginToken)
        .send({
            trigger_service_id: "string",
            trigger_id: 0,
            trigger_params: "{}",
            reaction_service_id: "string",
            reaction_id: 0,
            reaction_params: "{}"
        });
    expect(response.statusCode).toBe(201);
});

