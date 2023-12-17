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
 * /oauth/{id}/connect:
 *   get:
 *     tags:
 *       - service
 *     summary: Connect to service
 *     description: Connect to a service using OAuth
 *     operationId: connectToService
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the service.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful connection
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
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
 *     security:
 *       - bearerAuth: []
 */
router.get('/oauth/:id/connect', verifyToken, async (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    const service = serviceManager.getService(req.params.id);
    if (!service) {
        res.status(404).json({ msg: 'Service not found' });
        return;
    }
    const ret = await service.connect(userId);
    if (ret === "error") {
        res.status(400).json(msg.error);
    } else {
        // res.redirect(ret.url);
        res.status(200).json({ url: ret.url });
    }
});

/**
 * @swagger
 * /oauth/{id}/callback:
 *   get:
 *     tags:
 *       - service
 *     summary: OAuth callback
 *     description: Callback endpoint for OAuth authentication
 *     operationId: oauthCallback
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the service.
 *         required: true
 *         schema:
 *           type: string
 *       - name: code
 *         in: query
 *         description: The authentication code.
 *         required: true
 *         schema:
 *           type: string
 *       - name: userId
 *         in: query
 *         description: The user id.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful callback
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       '400':
 *         description: Bad request
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
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get('/oauth/:id/callback', async (req, res) => {
    const service = serviceManager.getService(req.params.id);
    if (!service) {
        return res.status(404).json({ msg: 'Service not found' });
    }

    const { code } = req.query;
    const { userId } = req.query;
    if (!code)
        return res.status(400).json({ msg: 'Bad parameter' });

    const ret = await service.callback(code);
    if (ret === "error")
        return res.status(400).json(ret.msg);
    if (!ret.token || !ret.action)
        return res.status(400).json({ msg: 'Bad parameter' });

    db.getServiceOauth(userId, service.id).then((rows) => {
        if (rows[0]) {
            db.updateServiceOauth(userId, service.id, ret.token).then((result) => {
                res.send(ret.action);
            }).catch((err) => {
                return res.status(500).json({ msg: 'Internal server error', error: err });
            });
        } else {
            db.insertServiceOauth(userId, service.id, ret.token).then((result) => {
                res.send(ret.action);
            }).catch((err) => {
                return res.status(500).json({ msg: 'Internal server error', error: err });
            });
        }
    }).catch((err) => {
        return res.status(500).json({ msg: 'Internal server error', error: err });
    });
});

export default router;
