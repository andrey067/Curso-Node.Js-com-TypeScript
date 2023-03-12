import AuthService from "@src/services/auth";
import { NextFunction, Request, Response } from "express";

export function authMiddleware(req: Partial<Request>, res: Partial<Response>, next: NextFunction): void {
    try {
        const token = req.headers?.['x-access-token'];
        const decoded = AuthService.decodeToke(token as string);
        req.decoded = decoded;
    } catch (err) {
        res.status?.(401).send({ code: 401, error: (err as Error).message })
    }
    next();
}