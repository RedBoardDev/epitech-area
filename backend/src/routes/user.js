import express from "express";
import { db, upload, verifyToken } from "../global.js";
import multer from "multer";
import path from 'path';

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
    db.getAllUsers().then((rows) => {
        res.json(rows);
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    });
});

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
