import { app, db } from "./global.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Area API" });
});

app.listen(process.env.API_PORT, process.env.API_HOST_NAME, () => {
    console.log(`App listening to http://${process.env.API_HOST_NAME}:${process.env.API_PORT}`);
});

export const testApp = app;