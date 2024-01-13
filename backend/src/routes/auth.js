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
 *     description: "Login to your Area account and obtain an access token"
 *     operationId: "login"
 *     security: []
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     requestBody:
 *       description: "User login credentials"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/loginParams"
 *     responses:
 *       '201':
 *         description: "Successful login"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/loginResponse"
 *       '400':
 *         description: "Bad request - Invalid username/password supplied"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
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
            const token = jwt.sign({ id: `${rows[0].id}` }, process.env.API_SECRET, { expiresIn: '40w' });
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
 * /auth/login/github/{code}:
 *   post:
 *     tags:
 *       - auth
 *     summary: "Login with GitHub"
 *     description: "Login to your Area account using GitHub authentication"
 *     operationId: "loginWithGithub"
 *     security: []
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: "Authorization code obtained from GitHub"
 *         schema:
 *           type: string
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     responses:
 *       '201':
 *         description: "Successful github login"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/loginResponse"
 *       '400':
 *         description: "Bad request - Invalid or missing GitHub authorization code"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 *       '500':
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/internalServerError"
 */
router.post("/login/github/:code", async (req, res) => {
    if (!req.params.code) {
        res.status(400).json({ msg: "Bad parameter" });
        return;
    }
    const code = req.params.code;

    try {
        const token = await getGithubToken(code);
        const email = await getGithubEmail(token);

        db.getUserByEmail(email, true).then((rows) => {
            if (rows[0] === undefined) {
                res.status(400).json({ msg: "Invalid Credentials" });
                return;
            }
            if (rows[0].auth_type !== 'github') {
                res.status(400).json({ msg: "Invalid Credentials" });
                return;
            }

            const token = jwt.sign({ id: `${rows[0].id}` }, process.env.API_SECRET, { expiresIn: '40w' });
            res.status(201).json({ token: token, id: rows[0].id });
        }).catch((err) => {
            res.status(500).json({ msg: "Internal server error", error: err });
            console.error(err);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal server error", error: error });
    }
});

/**
 * @swagger
 * /auth/login/githubmobile/{token}:
 *   post:
 *     tags:
 *       - auth
 *     summary: "Login with GitHub"
 *     description: "Login to your Area account using GitHub authentication"
 *     operationId: "loginWithGithubMobile"
 *     security: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: "GitHub token"
 *         schema:
 *           type: string
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     responses:
 *       '201':
 *         description: "Successful github login"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/loginResponse"
 *       '400':
 *         description: "Bad request - Invalid or missing GitHub authorization code"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 *       '500':
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/internalServerError"
 */
router.post("/login/githubmobile/:token", async (req, res) => {
    if (!req.params.token) {
        res.status(400).json({ msg: "Bad parameter" });
        return;
    }
    const token = req.params.token;

    try {
        const email = await getGithubEmail(token);

        db.getUserByEmail(email, true).then((rows) => {
            if (rows[0] === undefined) {
                res.status(400).json({ msg: "Invalid Credentials" });
                return;
            }
            if (rows[0].auth_type !== 'github') {
                res.status(400).json({ msg: "Invalid Credentials" });
                return;
            }

            const token = jwt.sign({ id: `${rows[0].id}` }, process.env.API_SECRET, { expiresIn: '40w' });
            res.status(201).json({ token: token, id: rows[0].id });
        }).catch((err) => {
            res.status(500).json({ msg: "Internal server error", error: err });
            console.error(err);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal server error", error: error });
    }
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
 *       description: "User registration credentials"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/registerParams"
 *     responses:
 *       '201':
 *         description: "Successful registration"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/loginResponse"
 *       '400':
 *         description: "Bad request - Invalid or missing registration parameters"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 *       '500':
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/internalServerError"
 */
router.post("/register", (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.lastname || !req.body.firstname || !checkEmail(req.body.email) || !checkPassword(req.body.password)) {
        res.status(400).json({ msg: "Bad parameter" });
        return;
    }

    const passwordHash = bcrypt.hashSync(req.body['password']);

    db.getUserByEmail(req.body.email).then((rows) => {
        if (rows[0] !== undefined) {
            res.status(400).json({ msg: "Email already exists" });
            return;
        }

        db.insertUser(req.body.email, passwordHash, req.body.lastname, req.body.firstname, 'password').then((rows) => {
            const token = jwt.sign({ id: `${rows.insertId}` }, process.env.API_SECRET, { expiresIn: '40w' });
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

/**
 * @swagger
 * /auth/register/github/{code}:
 *   post:
 *     tags:
 *       - auth
 *     summary: "Register with GitHub"
 *     description: "Register to an Area account using GitHub authentication"
 *     operationId: "githubRegister"
 *     security: []
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: "GitHub authorization code"
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: "Successful GitHub registration"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/loginResponse"
 *       '400':
 *         description: "Bad request - Invalid or missing GitHub authorization code"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 *       '500':
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/internalServerError"
 */
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
                const jwtToken = jwt.sign({ id: `${rows.insertId}` }, process.env.API_SECRET, { expiresIn: '40w' });
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

/**
 * @swagger
 * /auth/register/githubmobile/{token}:
 *   post:
 *     tags:
 *       - auth
 *     summary: "Register with GitHub"
 *     description: "Register to an Area account using GitHub authentication"
 *     operationId: "githubRegisterMobile"
 *     security: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: "GitHub token"
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: "Successful GitHub registration"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/loginResponse"
 *       '400':
 *         description: "Bad request - Invalid or missing GitHub authorization code"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 *       '500':
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/internalServerError"
 */
router.post("/register/githubmobile/:token", async (req, res) => {
    if (!req.params.token) {
        res.status(400).json({ msg: "Bad parameter" });
        return;
    }
    const token = req.params.token;

    try {
        const email = await getGithubEmail(token);
        const infos = await getGithubInfos(token);

        db.getUserByEmail(email).then((rows) => {
            if (rows[0] !== undefined) {
                res.status(400).json({ msg: "Email already exists" });
                return;
            }

            db.insertUser(email, null, infos.username, infos.username, 'github').then((rows) => {
                const jwtToken = jwt.sign({ id: `${rows.insertId}` }, process.env.API_SECRET, { expiresIn: '40w' });
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
