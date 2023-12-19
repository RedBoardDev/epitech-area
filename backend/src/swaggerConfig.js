export const options_SwaggerJsdoc = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Area API',
            version: '1.0.0',
            description: 'Documentation for Area API',
            license: {
                name: 'MIT',
                url: 'https://opensource.org/license/mit/',
            },
        },
        servers: [
            {
                url: process.env.API_PUBLIC_URL,
            },
        ],
        tags: [
            {
                name: 'auth',
                description: 'Endpoints for authentication',
            },
            {
                name: 'user',
                description: 'Endpoints for user management',
            },
            {
                name: 'service',
                description: 'Endpoints for service management',
            },
            {
                name: 'automations',
                description: 'Endpoints for automation management',
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                    description: 'Bearer token',
                },
            },
            schemas: {
                unauthorized: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                        },
                    },
                },
                loginParams: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                        },
                        password: {
                            type: 'string',
                        },
                    },
                },
                loginResponse: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string',
                        },
                        id: {
                            type: 'integer',
                            format: 'int64',
                        },
                    },
                },
                user: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                        },
                        email: {
                            type: 'string',
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                    xml: {
                        name: 'User',
                    },
                },
                service: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '',
                        },
                        name: {
                            type: 'string',
                            example: '',
                        },
                        description: {
                            type: 'string',
                            example: '',
                        },
                        color: {
                            type: 'string',
                            example: '',
                        },
                        icon: {
                            type: 'string',
                            example: '',
                        },
                        triggers: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: '',
                                    },
                                    description: {
                                        type: 'string',
                                        example: '',
                                    },
                                    fields: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                name: {
                                                    type: 'string',
                                                    example: '',
                                                },
                                                description: {
                                                    type: 'string',
                                                    example: '',
                                                },
                                                type: {
                                                    type: 'string',
                                                    example: 'text',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        reactions: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: '',
                                    },
                                    description: {
                                        type: 'string',
                                        example: '',
                                    },
                                    fields: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                name: {
                                                    type: 'string',
                                                    example: '',
                                                },
                                                description: {
                                                    type: 'string',
                                                    example: '',
                                                },
                                                type: {
                                                    type: 'string',
                                                    example: 'text',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    xml: {
                        name: 'Service',
                    },
                },
                serviceOauth: {
                    type: 'object',
                    properties: {
                        user_id: {
                            type: 'integer',
                            format: 'int64',
                        },
                        service_id: {
                            type: 'string',
                        },
                        token: {
                            type: 'string',
                        },
                    },
                    xml: {
                        name: 'ServiceOauth',
                    },
                },
                automation: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                        },
                        user_id: {
                            type: 'integer',
                            format: 'int64',
                        },
                        active: {
                            type: 'boolean',
                        },
                        trigger_service_id: {
                            type: 'string',
                        },
                        trigger_id: {
                            type: 'integer',
                            format: 'int64',
                        },
                        trigger_params: {
                            type: 'string',
                            example: '{}',
                            description: 'JSON string',
                        },
                        reaction_service_id: {
                            type: 'string',
                        },
                        reaction_id: {
                            type: 'integer',
                            format: 'int64',
                        },
                        reaction_params: {
                            type: 'string',
                            example: '{}',
                            description: 'JSON string',
                        },
                    },
                    xml: {
                        name: 'Automation',
                    },
                },
            },
        },
        security: [
            {
                BearerAuth: ['read', 'write'],
            },
        ],
    },
    apis: ['./src/routes/**/*.js'],
};

export const options_SwaggerUI = {
    customSiteTitle: 'Area API documentation',
    customSiteDescription: 'Area API documentation',
};
