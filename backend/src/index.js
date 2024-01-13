import { app, langRouter, db } from "./global.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import { serviceManager } from "./global.js";

langRouter.use("/auth", authRouter);
langRouter.use("/user", userRouter);

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Area API" });
});

/**
 * @swagger
 * /about.json:
 *   get:
 *     tags:
 *       - "about"
 *     summary: "Get information about the application"
 *     description: "Retrieve information about the client and server."
 *     operationId: "getAboutInfo"
 *     security: []
 *     responses:
 *       '200':
 *         description: "About information retrieved successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AboutInfoResponse"
 *       '500':
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/internalServerError"
 */
app.get("/about.json", (req, res) => {
    const clientHost = req.ip;
    const serverTime = Math.floor(Date.now() / 1000);

    const aboutJson = {
        client: {
            host: clientHost
        },
        server: {
            current_time: serverTime,
            services: serviceManager.getServiceObject(),
        }
    };

    res.json(aboutJson);
});

const port = process.env.API_PORT || 3000;
const host = process.env.API_HOST_NAME || 'localhost';

app.listen(port, host, () => {
    console.log(`App listening to http://${host}:${port}`);
});

export const testApp = app;