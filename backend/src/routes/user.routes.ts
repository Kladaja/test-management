import { Request, Response, Router } from "express";
import { User } from "../model/User";

export const userRoutes = (): Router => {
    const router = Router();

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('User is not authenticated.'); }
        else {
            const users = User.find();
            users.then(data => {
                res.status(200).send(data);
            }).catch(err => {
                res.status(500).send(err);
            })
        }
    });

    router.get('/getCurrentUser', (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('User is not authenticated.'); }
        else { res.status(200).send(req.user); }
    });

    return router;
};