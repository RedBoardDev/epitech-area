import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, encryptString } from "../global.js";
import { getGithubToken, getGithubEmail, getGithubInfos } from "./authGithubUtils.js";

function checkEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function checkPassword(password) {
    return true;
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)
}

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: "Login to your Area account"
 *     description: "Login to your Area account"
 *     operationId: "login"
 *     security: []
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     requestBody:
 *       description: "Login credentials"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/loginParams"
 *     responses:
 *       '201':
 *         description: "Successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/loginResponse"
 *       '400':
 *         description: "Invalid username/password supplied"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
router.post("/login", (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({ msg: "Bad parameter" });
        return;
    }

    db.getUserByEmail(req.body.email, true).then((rows) => {
        if (rows[0] === undefined) {
            res.status(400).json({ msg: "Invalid Credentials" });
            return;
        }

        if (bcrypt.compareSync(req.body.password, rows[0].password)) {
            let token = jwt.sign({ id: `${rows[0].id}` }, process.env.SECRET, { expiresIn: '40w' });
            res.status(201).json({ token: token, id: rows[0].id });
        } else {
            res.status(400).json({ msg: "Invalid Credentials" });
        }
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    });
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - auth
 *     summary: "Register to an Area account"
 *     description: "Register to an Area account"
 *     operationId: "register"
 *     security: []
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     requestBody:
 *       description: Register credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/loginParams"
 *     responses:
 *       '201':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/loginResponse"
 *       '400':
 *         description: Invalid username/password supplied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
router.post("/register", (req, res) => {
    if (!req.body.email || !req.body.password || !checkEmail(req.body.email) || !checkPassword(req.body.password)) {
        res.status(400).json({ msg: "Bad parameter" });
        return;
    }

    const passwordHash = bcrypt.hashSync(req.body['password']);

    db.getUserByEmail(req.body.email).then((rows) => {
        if (rows[0] !== undefined) {
            res.status(400).json({ msg: "Email already exists" });
            return;
        }

        db.insertUser(req.body.email, passwordHash, req.body.lastname, req.body.firstname).then((rows) => {
            let token = jwt.sign({ id: `${rows.insertId}` }, process.env.SECRET, { expiresIn: '40w' });
            res.status(201).json({ token: token, id: rows.insertId });
        }).catch((err) => {
            res.status(500).json({ msg: "Internal server error", error: err });
            console.error(err);
        });
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    });
});

router.post("/register/github/:code", async (req, res) => {
    if (!req.params.code) {
        res.status(400).json({ msg: "Bad parameter" });
        return;
    }
    const code = req.params.code;

    try {
        const token = await getGithubToken(code);
        const email = await getGithubEmail(token);
        const infos = await getGithubInfos(token);

        db.getUserByEmail(email).then((rows) => {
            if (rows[0] !== undefined) {
                res.status(400).json({ msg: "Email already exists" });
                return;
            }

            db.insertUser(email, null, infos.username, infos.username, 'github').then((rows) => {
                const jwtToken = jwt.sign({ id: `${rows.insertId}` }, process.env.SECRET, { expiresIn: '40w' });
                res.status(201).json({ token: jwtToken, id: rows.insertId });
            }).catch((err) => {
                res.status(500).json({ msg: "Internal server error", error: err });
                console.error(err);
            });
        }).catch((err) => {
            res.status(500).json({ msg: "Internal server error", error: err });
            console.error(err);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal server error", error: error });
    }
});

export default router;
