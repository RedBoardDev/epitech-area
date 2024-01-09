import express from "express";
import { db, serviceManager, verifyToken, getIdFromToken, t } from "../global.js";

const router = express.Router();

router.get('/active', verifyToken, async (req, res) => {
    try {
        const userId = getIdFromToken(req, res); if (userId === -1) return;
        const result = await db.getServiceByActive(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error });
    }
});

/**
 * @swagger
 * /service:
 *   get:
 *     tags:
 *       - service
 *     summary: "Get all services"
 *     description: "Get all services"
 *     operationId: "getAllServices"
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
 *                 $ref: "#/components/schemas/service"
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
router.get('/', verifyToken, async (req, res) => {
    try {
        const services = serviceManager.getServicesTranslated(t.getUrlLang(req));
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error: error });
    }
});

/**
 * @swagger
 * /service/{id}:
 *   get:
 *     tags:
 *       - service
 *     summary: "Get service by id"
 *     description: "Get service by id"
 *     operationId: "getServiceById"
 *     produces:
 *       - application/json
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
 *               $ref: "#/components/schemas/service"
 *       '404':
 *         description: "Service not found"
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
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const service = serviceManager.getServiceTranslated(t.getUrlLang(req), req.params.id);
        if (!service) {
            res.status(404).json({ msg: 'Service not found' });
            return;
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error: error });
    }
});

/**
 * @swagger
 * /oauth/{id}/connect:
 *   get:
 *     tags:
 *       - service
 *     summary: "Connect to service"
 *     description: "Connect to a service using OAuth"
 *     operationId: "connectToService"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "The id of the service."
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "Successful connection"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       '400':
 *         description: "Bad request"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/badRequest"
 *       '404':
 *         description: "Service not found"
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
router.get('/oauth/:id/connect', verifyToken, async (req, res) => {
    try {
        const userId = getIdFromToken(req, res);
        if (userId === -1) return;

        const service = serviceManager.getService(req.params.id);
        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        const ret = await service.connect(userId);
        if (ret === "error") {
            return res.status(400).json({ msg: 'Error connecting to the service' });
        }

        if (ret.auth === false) {
            const rows = await db.getServiceOauth(userId, service.id);

            if (rows[0]) {
                await db.updateServiceOauth(userId, service.id, 'disable');
            } else {
                await db.insertServiceOauth(userId, service.id, 'disable');
            }
        }
        return res.status(200).json({ url: ret.url });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error: error });
    }
});

/**
 * @swagger
 * /oauth/{id}/callback:
 *   get:
 *     tags:
 *       - service
 *     summary: "OAuth callback"
 *     description: "Callback endpoint for OAuth authentication"
 *     operationId: "oauthCallback"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "The id of the service."
 *         required: true
 *         schema:
 *           type: string
 *       - name: code
 *         in: query
 *         description: "The authentication code."
 *         required: true
 *         schema:
 *           type: string
 *       - name: userId
 *         in: query
 *         description: "The user id."
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "Successful callback"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       '400':
 *         description: "Bad request - Invalid or missing parameters"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/badRequest"
 *       '404':
 *         description: "Service not found"
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
router.get('/oauth/:id/callback', async (req, res) => {
    const service = serviceManager.getService(req.params.id);
    if (!service) {
        return res.status(404).json({ msg: 'Service not found' });
    }

    const { code } = req.query;
    let userId = req.query ? req.query.userId || req.query.state : undefined;
    if (userId.startsWith("\""))
        userId = JSON.parse(userId);

    if (!code || !userId)
        return res.status(400).json({ msg: 'Bad parameter1' });

    const ret = await service.callback(code);
    if (ret === "error")
        return res.status(400).json(ret.msg);
    console.log(ret.token);
    console.log(ret.action);
    if (!ret.token || !ret.action)
        return res.status(400).json({ msg: 'Bad parameter2' });
    db.getServiceOauth(userId, service.id).then((rows) => {
        if (rows[0]) {
            db.updateServiceOauth(userId, service.id, ret.token).then((result) => {
                return res.send(ret.action);
            }).catch((err) => {
                return res.status(500).json({ msg: 'Internal server error', error: err });
            });
        } else {
            db.insertServiceOauth(userId, service.id, ret.token).then((result) => {
                return res.send(ret.action);
            }).catch((err) => {
                return res.status(500).json({ msg: 'Internal server error', error: err });
            });
        }
    }).catch((err) => {
        return res.status(500).json({ msg: 'Internal server error', error: err });
    });
});

/**
 * @swagger
 * /service/oauth/{id}:
 *   delete:
 *     summary: "Delete service OAuth"
 *     description: "Deletes the OAuth credentials for a specific service."
 *     tags:
 *       - service
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The ID of the service."
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: "Successful deletion"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *       '400':
 *         description: "Bad request - Invalid or missing parameters"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/badRequest"
 *       '404':
 *         description: "Service not found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/notFound"
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 */
router.delete('/oauth/:id', verifyToken, async (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    const service = serviceManager.getService(req.params.id);
    if (!service) {
        res.status(404).json({ msg: 'Service not found' });
        return;
    }
    db.deleteServiceOauth(userId, service.id).then((result) => {
        res.status(200).json({ msg: "Service deleted" });
    }).catch((err) => {
        res.status(400).json(err);
    });
});

/**
 * @swagger
 * /service/oauth/{id}/connected:
 *   get:
 *     summary: "Check if service is connected"
 *     description: "Checks if a specific service is connected for the user."
 *     tags:
 *       - service
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "The ID of the service."
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: "Success"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 connected:
 *                   type: boolean
 *                   description: Indicates if the service is connected or not.
 *       '400':
 *         description: "Bad request - Invalid or missing parameters"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/badRequest"
 *       '404':
 *         description: "Service not found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/notFound"
 *       '401':
 *         description: "Unauthorized - Missing or invalid token"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 */
router.get('/oauth/:id/connected', verifyToken, async (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    const service = serviceManager.getService(req.params.id);
    if (!service) {
        res.status(404).json({ msg: 'Service not found' });
        return;
    }
    db.getServiceOauth(userId, service.id).then((rows) => {
        if (rows[0]) {
            res.status(200).json({ connected: true });
        } else {
            res.status(200).json({ connected: false });
        }
    }).catch((err) => {
        res.status(400).json(msg.error);
    });
});

export default router;
