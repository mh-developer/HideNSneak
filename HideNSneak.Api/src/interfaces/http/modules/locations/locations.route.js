const express = require("express");
const router = express.Router();
const Pusher = require("pusher");
const Status = require("http-status");
const locationMapper = require("./location.mapper");
const services = require("../../../../app/index");

// TODO: move this logic to service layer
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});

/**
 * @swagger
 * /api/v1/locations/ping:
 *   post:
 *     tags:
 *       - Locations
 *     description: Report new location
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/ping", (req, res) => {
    // TODO
    const { lat, lng } = req.body;
    const data = {
        lat,
        lng,
    };
    pusher.trigger("location", "ping", data);
    res.status(Status.OK).json(data);
});

/**
 * @swagger
 * /api/v1/locations/notify:
 *   post:
 *     tags:
 *       - Locations
 *     description: Notify clients
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.post("/notify", (req, res) => {
    // TODO
    const { lat, lng } = req.body;
    const data = {
        lat,
        lng,
    };
    pusher.trigger("geofence", "exit", data);
    res.status(Status.OK).json(data);
});

/**
 * @swagger
 * /api/v1/locations/:
 *   get:
 *     tags:
 *       - Locations
 *     description: Get a list of teammates locations
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.get("/", async (req, res) => {
    // TODO
    try {
        const locations = await services.locationsService.getAll();
        res.status(Status.OK).json(locations);
    } catch (error) {
        res.status(Status.BAD_REQUEST).json(error);
    }
});

/**
 * @swagger
 * /api/v1/locations/{id}:
 *   get:
 *     tags:
 *       - Locations
 *     description: Get specific location
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.get("/:id", async (req, res) => {
    // TODO
    try {
        const { id } = req.params,
            location = await services.locationsService.get(id);
        if (location) {
            res.status(Status.OK).json(location);
        } else {
            res.status(Status.NOT_FOUND).json(`Location ${id} not found.`);
        }
    } catch (error) {
        res.status(Status.BAD_REQUEST).json(error);
    }
});

/**
 * @swagger
 * /api/v1/locations/:
 *   post:
 *     tags:
 *       - Locations
 *     description: Create new location
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.post(
    "/",
    async (req, res, next) => {
        // TODO
        try {
            const { error } = await locationMapper.validateAsync(req.body);
            if (error) {
                res.status(Status.BAD_REQUEST).json("Model validation error");
            } else {
                next();
            }
        } catch (error) {
            res.status(Status.BAD_REQUEST).json(error);
        }
    },
    async (req, res) => {
        // TODO
        try {
            const location = await services.locationsService.create(req.body);
            res.status(Status.CREATED).json(location);
        } catch (error) {
            res.status(Status.BAD_REQUEST).json(error);
        }
    }
);

/**
 * @swagger
 * /api/v1/locations/{id}:
 *   put:
 *     tags:
 *       - Locations
 *     description: Update location
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.put(
    "/:id",
    async (req, res, next) => {
        // TODO
        try {
            const { error } = await locationMapper.validateAsync(req.body);
            if (error) {
                res.status(Status.BAD_REQUEST).json("Model validation error");
            } else if (req.params.id != req.body.id) {
                res.status(Status.BAD_REQUEST).json(
                    "Model validation error. ID arguments not same."
                );
            } else {
                next();
            }
        } catch (error) {
            res.status(Status.BAD_REQUEST).json(error);
        }
    },
    async (req, res) => {
        // TODO
        try {
            const { id } = req.params,
                location = await services.locationsService.get(id);
            if (location) {
                await services.locationsService.update(id, req.body);
                res.status(Status.NO_CONTENT).json();
            } else {
                res.status(Status.NOT_FOUND).json(`Location ${id} not found.`);
            }
        } catch (error) {
            res.status(Status.BAD_REQUEST).json(error);
        }
    }
);

/**
 * @swagger
 * /api/v1/locations/{id}:
 *   delete:
 *     tags:
 *       - Locations
 *     description: Delete location
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.delete("/:id", async (req, res) => {
    // TODO
    try {
        const { id } = req.params,
            location = await services.locationsService.get(id);
        if (location) {
            await services.locationsService.remove(id);
            res.status(Status.NO_CONTENT).json();
        } else {
            res.status(Status.NOT_FOUND).json(`Location ${id} not found.`);
        }
    } catch (error) {
        res.status(Status.BAD_REQUEST).json(error);
    }
});

module.exports = router;
