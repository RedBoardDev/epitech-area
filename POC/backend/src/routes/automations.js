import express from "express";
import { db, serviceManager, verifyToken, getIdFromToken } from "../global.js";

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = getIdFromToken(req, res); if (userId === -1) return;
        const userServices = await db.getAutomations(userId);
        res.status(200).json(userServices);
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error: error });
    }
});

router.post('/', verifyToken, async (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    if (!req.body.trigger_service_id || !req.body.trigger_id || !req.body.trigger_params || !req.body.reaction_service_id || !req.body.reaction_id || !req.body.reaction_params) {
        res.status(400).json({ msg: 'Bad parameters' });
        return;
    }
    db.insertAutomation(userId, req.body.trigger_service_id, req.body.trigger_id, req.body.trigger_params, req.body.reaction_service_id, req.body.reaction_id, req.body.reaction_params)
        .then((result) => {
            res.status(201).json({ msg: 'Automation created' });
        }).catch((error) => {
            res.status(500).json({ msg: 'Internal server error', error: error });
        });
});

router.put('/', verifyToken, async (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    let query = "";
    if (req.body.trigger_service_id)
        query += `trigger_service_id = ${req.body.trigger_service_id}, `;
    if (req.body.trigger_id)
        query += `trigger_id = ${req.body.trigger_id}, `;
    if (req.body.trigger_params)
        query += `trigger_params = ${req.body.trigger_params}, `;
    if (req.body.reaction_service_id)
        query += `reaction_service_id = ${req.body.reaction_service_id}, `;
    if (req.body.reaction_id)
        query += `reaction_id = ${req.body.reaction_id}, `;
    if (req.body.reaction_params)
        query += `reaction_params = ${req.body.reaction_params}, `;
    if (query.length > 0)
        query = query.substring(0, query.length - 2);
    if (!query || !req.body.id) {
        res.status(400).json({ msg: 'Bad parameters' });
        return;
    }
    db.updateAutomation(userId, req.body.id, query)
        .then((result) => {
            res.status(200).json({ msg: 'Automation updated' });
        }).catch((error) => {
            res.status(500).json({ msg: 'Internal server error', error: error });
        });
});

router.delete('/', verifyToken, async (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    if (!req.body.id) {
        res.status(400).json({ msg: 'Bad parameters' });
        return;
    }
    db.deleteAutomation(userId, req.body.id)
        .then((result) => {
            res.status(200).json({ msg: 'Automation deleted' });
        }).catch((error) => {
            res.status(500).json({ msg: 'Internal server error', error: error });
        });
});

export default router;
