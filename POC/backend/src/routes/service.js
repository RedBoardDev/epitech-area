import express from "express";
import { db, serviceManager, verifyToken, getIdFromToken } from "../global.js";

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    const services = serviceManager.getServices();
    res.status(200).json(services);
});

router.get('/:id', verifyToken, async (req, res) => {
    const service = serviceManager.getService(req.params.id);
    if (!service) {
        res.status(404).json({ msg: 'Service not found' });
        return;
    }
    res.status(200).json(service);
});

router.get('/oauth/:id', verifyToken, async (req, res) =>  {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    const service = serviceManager.getService(req.params.id);
    if (!service) {
        res.status(404).json({ msg: 'Service not found' });
        return;
    }
    db.getServiceOauth(userId, service.id).then((rows) => {
        if (rows[0]) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ msg: 'You are not authenticated to this service' });
        }
    }).catch((err) => {
        res.status(500).json({ msg: 'Internal server error', error: err });
    });
});

router.post('/oauth/:id', verifyToken, async (req, res) => {
    const service = serviceManager.getService(req.params.id);
    if (!service) {
        res.status(404).json({ msg: 'Service not found' });
        return;
    }
    const serviceToken = req.body.token;
    if (!serviceToken) {
        res.status(400).json({ msg: 'Token is required' });
        return;
    }
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    db.getServiceOauth(userId, service.id).then((rows) => {
        if (rows[0]) {
            db.updateServiceOauth(userId, service.id, serviceToken).then((result) => {
                res.status(200).json({ msg: 'Service oauth updated' });
            }).catch((err) => {
                res.status(500).json({ msg: 'Internal server error', error: err });
            });
        } else {
            db.insertServiceOauth(userId, service.id, serviceToken).then((result) => {
                res.status(201).json({ msg: 'Service oauth activated' });
            }).catch((err) => {
                res.status(500).json({ msg: 'Internal server error', error: err });
            });
        }
    })
});

export default router;
