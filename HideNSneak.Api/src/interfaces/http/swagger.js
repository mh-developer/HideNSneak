const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { Router } = require("express");

module.exports = () => {
    const router = Router();

    const swaggerDefinition = {
        info: {
            title: "HideNSneak API",
            version: "1.0.0",
            description: "Available REST Endpoints of HideNSneak REST API",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        securityDefinitions: {
            JWT: {
                description: "",
                type: "apiKey",
                name: "Authorization",
                in: "header",
            },
        },
    };

    const options = {
        swaggerDefinition: swaggerDefinition,
        apis: ["./src/interfaces/http/modules/**/*.js"],
    };

    const swaggerSpec = swaggerJsdoc(options);

    router.get("/", (req, res) => {
        res.redirect("/swagger");
    });

    router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    return router;
};
