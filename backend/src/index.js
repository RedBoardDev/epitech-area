import { app, langRouter, db } from "./global.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

langRouter.use("/auth", authRouter);
langRouter.use("/user", userRouter);

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Area API" });
});

const port = process.env.API_PORT || 3000;
const host = process.env.API_HOST_NAME || 'localhost';

app.listen(port, host, () => {
    console.log(`App listening to http://${host}:${port}`);
});

export const testApp = app;