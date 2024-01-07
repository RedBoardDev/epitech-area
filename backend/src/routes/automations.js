import express from "express";
import { db, serviceManager, verifyToken, getIdFromToken } from "../global.js";

const router = express.Router();

router.get('/favorite', verifyToken, async (req, res) => {
    try {
        const userId = getIdFromToken(req, res); if (userId === -1) return;
        const result = await db.getAutomationsByFav(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error });
    }
})

/**
 * @swagger
 * /automations:
 *   get:
 *     tags:
 *       - automations
 *     summary: "Get all automations associated to the current user"
 *     description: "Get all automations associated to the current user"
 *     operationId: "getAllAutomations"
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
 *                 $ref: "#/components/schemas/automation"
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
        const userId = getIdFromToken(req, res); if (userId === -1) return;
        const userServices = await db.getAutomations(userId);
        res.status(200).json(userServices);
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error: error });
    }
});

/**
 * @swagger
 * /automations/{id}:
 *   get:
 *     tags:
 *       - automations
 *     summary: "Get automation by ID"
 *     description: "Get automation details by providing its ID"
 *     operationId: "getAutomationById"
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the automation to retrieve"
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: "Successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/automation"
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
        const result = await db.getAutomationsById(req.params.id);
        res.json(result);

    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: err });
    }
})

/**
 * @swagger
 * /automations:
 *   post:
 *     tags:
 *       - automations
 *     summary: "Add an automation"
 *     description: "Add an automation"
 *     operationId: "addAutomation"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: "Automation"
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             trigger_service_id:
 *               type: string
 *             trigger_id:
 *               type: integer
 *               format: int64
 *             trigger_params:
 *               type: string
 *               example: "{}"
 *               description: JSON string
 *             reaction_service_id:
 *               type: string
 *             reaction_id:
 *               type: integer
 *               format: int64
 *             reaction_params:
 *               type: string
 *               example: "{}"
 *               description: JSON string
 *     responses:
 *       '201':
 *         description: "Successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       '400':
 *         description: "Unauthorized - Invalid or missing authentication token"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/badRequest"
 *       '403':
 *         description: "Unauthorized - Invalid or missing authentication token"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorized"
 *       '401':
 *         description: "Unauthorized - Invalid or missing service connection"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/unauthorizedService"
 *       '500':
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/internalServerError"
 *     security:
 *       - bearerAuth: []
 */
router.post('/', verifyToken, async (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    const {
        trigger_service_id,
        trigger_id,
        trigger_params,
        reaction_service_id,
        reaction_id,
        reaction_params
    } = req.body;

    if (!trigger_service_id || !trigger_id || !trigger_params || !reaction_service_id || !reaction_id || !reaction_params) {
        res.status(400).json({ msg: 'Bad parameters' });
        return;
    }

    db.insertAutomation(userId, req.body.trigger_service_id, req.body.trigger_id, req.body.trigger_params, req.body.reaction_service_id, req.body.reaction_id, req.body.reaction_params, req.body.automation_name)
    .then((result) => {
        res.status(201).json({ msg: 'Automation created' });
    }).catch(async (error) => {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                const triggerServiceExists = await db.getServiceOauth(userId, trigger_service_id);

                if (!triggerServiceExists || !triggerServiceExists.length) {
                    res.status(401).json({ msg: 'You are not connected to this service.', service_id: trigger_service_id });
                    return;
                }

                const reactionServiceExists = await db.getServiceOauth(userId, reaction_service_id);
                if (!reactionServiceExists || !reactionServiceExists.length) {
                    res.status(401).json({ msg: 'Reaction service does not exist', service_id: reaction_service_id });
                    return;
                }
            }
            res.status(500).json({ msg: 'Internal server error', error: error });
        });
});

/**
 * @swagger
 * /automations:
 *   put:
 *     tags:
 *       - automations
 *     summary: "Update an automation"
 *     description: "Update an automation"
 *     operationId: "updateAutomation"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: "Automation details for update"
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               format: int64
 *             trigger_service_id:
 *               type: string
 *             trigger_id:
 *               type: integer
 *               format: int64
 *             trigger_params:
 *               type: string
 *               example: "{}"
 *               description: JSON string
 *             reaction_service_id:
 *               type: string
 *             reaction_id:
 *               type: integer
 *               format: int64
 *             reaction_params:
 *               type: string
 *               example: "{}"
 *               description: JSON string
 *     responses:
 *       '200':
 *         description: "Successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       '400':
 *         description: "Bad parameters"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/badRequest"
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
router.put('/', verifyToken, async (req, res) => {
    const userId = getIdFromToken(req, res); if (userId === -1) return;
    let query = "";
    if (req.body.active)
        query += `active = ${req.body.active}, `;
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

/**
 * @swagger
 * /automations/{id}:
 *   put:
 *     tags:
 *       - automations
 *     summary: "Update an automation by ID"
 *     description: "Update an automation by providing its ID"
 *     operationId: "updateAutomationById"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the automation to update"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: "Automation details for update"
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *     responses:
 *       '200':
 *         description: "Successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       '500':
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/internalServerError"
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verifyToken, async (req, res) => {
    db.updateAutomationById(req.params.id, req.body.reaction_params, req.body.trigger_params, req.body.automation_name).then((result) => {
        res.status(200).json({ msg: 'Automation updated' });
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    })
})

router.put('/favorite/:id', verifyToken, async (req, res) => {
    db.updateFavorite(req.params.id, req.body.fav).then((result) => {
        res.status(200).json({ msg: 'Automation fav updated' });
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server error", error: err });
        console.error(err);
    })
})

/**
 * @swagger
 * /automations:
 *   delete:
 *     tags:
 *       - automations
 *     summary: "Delete an automation"
 *     description: "Delete an automation"
 *     operationId: "deleteAutomation"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "query"
 *         description: "ID of the automation to delete"
 *         required: true
 *         schema:
 *           type: "integer"
 *           format: "int64"
 *     responses:
 *       '200':
 *         description: "Successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 msg:
 *                   type: "string"
 *       '400':
 *         description: "Bad parameters"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/badRequest"
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
