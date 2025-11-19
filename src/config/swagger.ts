import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'API documentation for my Express backend',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // optional, only for display in Swagger UI
        },
      },
    },
    security: [], // global security (optional)
  },
  apis: ['./src/routes/*.ts'], // your route files with swagger comments
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
