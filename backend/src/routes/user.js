import express from "express";
import { db, upload, verifyToken } from "../global.js";
import multer from "multer";
import path from 'path';

const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - user
 *     summary: "Get all users"
 *     description: "Get all users"
 *     operationId: "getAllUsers"
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: "Successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/user"
 *       '400':
 *         description: "Bad request - Invalid username supplied"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/badRequest"
 *       '404':
 *         description: "User not found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/notFound"
 *       '403':
 *         description: "Unauthorized"
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
 *     security:
 *       - bearerAuth: []
 */
router.get("/", verifyToken, (req, res) => {
    db.getAllUsers().then((rows) => {
        res.json(rows);
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    });
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - "user"
 *     summary: "Get user by id"
 *     description: "Get user by id"
 *     operationId: "getUserById"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "The id that needs to be fetched."
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "Successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/user"
 *       '404':
 *         description: "User not found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/notFound"
 *       '403':
 *         description: "Unauthorized - Invalid or expired token"
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
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", verifyToken, (req, res) => {
    db.getUserById(req.params.id).then((rows) => {
        if (rows[0])
            res.json(rows[0]);
        else
            res.status(404).json({ msg: "User not found" });
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    });
});


/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags:
 *       - "user"
 *     summary: "Update user"
 *     description: "Update user by id"
 *     operationId: "updateUser"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "The id of the user to update."
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: "The updated user data."
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/user"
 *     responses:
 *       '200':
 *         description: "User updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/user"
 *       '400':
 *         description: "Bad request - Invalid or missing parameters"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/badRequest"
 *       '404':
 *         description: "User not found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/notFound"
 *       '403':
 *         description: "Unauthorized - Invalid or missing authentication token"
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
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", verifyToken, (req, res) => {
    db.updateUser(req.params.id, req.body.lastname, req.body.firstname, req.body.email).then((result) => {
        res.status(200).json({ msg: 'User updated' });
    }).catch((err) => {
        // check user not found
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    })
})

/**
 * @swagger
 * /user/profile/{id}:
 *   post:
 *     tags:
 *       - "user"
 *     summary: "Update user profile image"
 *     description: "Update user profile image by id"
 *     operationId: "updateUserProfile"
 *     consumes:
 *       - "multipart/form-data"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "The id of the user."
 *         required: true
 *         schema:
 *           type: string
 *       - name: profileImage
 *         in: formData
 *         description: "The profile image to upload."
 *         required: true
 *         type: file
 *     responses:
 *       '200':
 *         description: "User updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       '400':
 *         description: "Bad request - Invalid or missing parameters"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/badRequest"
 *       '401':
 *         description: "Unauthorized - Missing or invalid bearer token"
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
 *     security:
 *       - bearerAuth: []
 */
router.post('/profile/:id', verifyToken, (req, res) => {
    upload.single('profileImage')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ msg: "Multer error", error: err.message });
        } else if (err) {
            return res.status(500).json({ msg: "Internal server error", error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ msg: "No image uploaded" });
        }
        const imagePath = req.file.path;

        if (!imagePath) {
            return res.status(400).json({ msg: "Bad parameter" });
        }

        db.updateUser(req.params.id, `profile_img = '${imagePath}'`)
            .then((rows) => {
                res.status(200).json({ msg: "User updated successfully" });
            })
            .catch((err) => {
                res.status(500).json({ msg: "Internal server error", error: err.message });
                console.error(err);
            });
    });
});

/**
 * @swagger
 * /user/profile/{id}:
 *   get:
 *     tags:
 *       - "user"
 *     summary: "Get user profile image"
 *     description: "Get user profile image by id"
 *     operationId: "getUserProfile"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "The id of the user."
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "User profile image retrieved successfully"
 *         content:
 *           image/*:
 *             schema:
 *               type: file
 *       '404':
 *         description: "User not found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/notFound"
 *       '500':
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/internalServerError"
 */
router.get("/profile/:id", (req, res) => {
    db.getUserById(req.params.id).then((rows) => {
        if (rows[0]) {
            const imagePath = path.join(process.env.UPLOAD_DIRECTORY, rows[0]['profile_img']);
            res.sendFile(imagePath);
        } else
            res.status(404).json({ msg: "User not found" });
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    });
});

export default router;
