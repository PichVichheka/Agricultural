import { Request, Response } from 'express';
import { registerUser } from '../service/authService';

export const registerController = async (req: Request, res: Response) => {
    const result = await registerUser(req, res);
    return res.json(result);
}