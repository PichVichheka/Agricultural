import { Router } from "express";
import {
  createRoleController,
  getRolesController,
  getRoleByIdController,
  updateRoleController,
  deleteRoleController,
} from "../controllers/roleController";

const router = Router();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get("/", getRolesController);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 675c48fae41b8b9784c4a123
 *     responses:
 *       200:
 *         description: Role found
 *       404:
 *         description: Role not found
 */
router.get("/:id", getRoleByIdController);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update role
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: manager
 *               description:
 *                 type: string
 *                 example: Manager role
 *     responses:
 *       200:
 *         description: Role updated
 */
router.put("/:id", updateRoleController);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete role
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted
 */
router.delete("/:id", deleteRoleController);

export default router;