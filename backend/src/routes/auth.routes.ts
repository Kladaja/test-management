import { Router, Request, Response, NextFunction } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../model/User';

export const authRoutes = (passport: PassportStatic): Router => {
    const router = Router();

    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) return res.status(500).send(error);
            if (!user) return res.status(400).send('User not found.');
            req.login(user, (err) => {
                if (err) return res.status(500).send('Internal server error.');
                res.status(200).send(user);
            });
        })(req, res, next);
    });

    router.post('/register', async (req, res) => {
        const { email, password, firstName, lastName, role } = req.body;
        const user = new User({ email, password, firstName, lastName, role });
        try {
            const data = await user.save();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    router.post('/logout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout(err => {
                if (err) return res.status(500).send('Internal server error.');
                res.status(200).send('Successfully logged out.');
            });
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/checkAuth', (req, res) => {
        res.status(req.isAuthenticated() ? 200 : 500).send(req.isAuthenticated());
    });

    return router;
};