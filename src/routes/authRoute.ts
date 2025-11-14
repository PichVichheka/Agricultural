import express from 'express';
import { registerController } from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: reach123
 *               email:
 *                 type: string
 *                 example: reach123@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               phone:
 *                 type: string
 *                 example: "097937123"
 *               address:
 *                 type: string
 *                 example: Phnom Penh
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: "6789abcd1234"
 *                 username: "reach123"
 *                 email: "reach123@gmail.com"
 *                 phone: "097937123"
 *                 address: "Phnom Penh"
 *       400:
 *         description: Validation error or duplicate key
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Username or Email already exists"
 */
router.post('/register', registerController);

export default router;
