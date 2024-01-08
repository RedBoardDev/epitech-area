const { test } = require('@jest/globals');
const request = require('supertest');

test("About.json", async () => {
    const response = await request("https://area.mazettt.fr/api")
        .get("/about.json");
    expect(response.statusCode).toBe(200);
});
