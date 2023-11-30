import express from "express";
import bodyParser from "body-parser";
import { app, db } from "./global.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("Area API");
});

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
    console.log(`App listening to http://${process.env.HOST_NAME}:${process.env.PORT}`);
});
