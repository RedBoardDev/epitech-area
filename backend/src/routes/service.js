import express from "express";
import { db, serviceManager, verifyToken, getIdFromToken } from "../global.js";

const router = express.Router();

/**
 * @swagger
 * /service:
 *   get:
 *     tags:
 *       - service
 *     summary: Get all services
 *     description: Get all services
 *     operationId: getAllServices
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/service"
 *       '403':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 *     security:
 *       - bearerAuth: []
 */
router.get('/', verifyToken, async (req, res) => {
    const services = serviceManager.getServices();
    res.status(200).json(services);
});

/**
 * @swagger
 * /service/{id}:
 *   get:
 *     tags:
 *       - service
 *     summary: Get service by id
 *     description: Get service by id
 *     operationId: getServiceById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id that needs to be fetched.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/service"
 *       '404':
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       '403':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verifyToken, async (req, res) => {
    const service = serviceManager.getService(req.params.id);
    if (!service) {
        res.status(404).json({ msg: 'Service not found' });
        return;
    }
    res.status(200).json(service);
});

/**
 * @swagger
 * /service/oauth/{id}:
 *   get:
 *     tags:
 *       - service
 *     summary: Get oauth service token for the current user
 *     description: Get oauth service token for the current user
 *     operationId: getOauthToken
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id that needs to be fetched.
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/serviceOauth"
 *       '404':
 *         description: You are not authenticated to this service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       '403':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 *     security:
 *       - bearerAuth: []
 */
router.get('/oauth/:id', verifyToken, async (req, res) => {
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

/**
 * @swagger
 * /service/oauth/{id}:
 *   post:
 *     tags:
 *       - service
 *     summary: Add or update oauth service token for the current user
 *     description: Add or update oauth service token for the current user
 *     operationId: addOauthToken
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id that needs to be fetched.
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: Oauth token
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       '400':
 *         description: No token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       '404':
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       '403':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 *     security:
 *       - bearerAuth: []
 */
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
    }).catch((err) => {
        res.status(500).json({ msg: 'Internal server error', error: err });
    });
});

export default router;
