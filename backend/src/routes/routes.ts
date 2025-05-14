import { NextFunction, Request, Response, Router } from "express";
import { PassportStatic } from "passport";

import { User } from "../model/User";
import { Project } from "../model/Project";

export const configureRoutes = (passport: PassportStatic, router: Router): Router => {
    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const role = req.body.role;
        const user = new User({ email: email, password: password, firstName: firstName, lastName: lastName, role: role });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('User is not authenticated.'); }
        if (req.isAuthenticated()) {
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getCurrentUser', (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('User is not authenticated.'); }
        res.status(200).send(req.user);
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        } else {
            res.status(500).send(false);
        }
    });

    router.get('/getAllProjects', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('User is not authenticated.'); }
        try {
            const projects = await Project.find().populate('createdBy', 'email').exec();
            res.status(200).json(projects);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching projects.');
        }
    });

    router.get('/getProjectById/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('User is not authenticated.'); }
        try {
            const project = await Project.findById(req.params.id).populate('createdBy', 'email').exec();
            if (!project) {
                res.status(404).send('Project not found.');
            }
            res.status(200).json(project);
        } catch (error) {
            res.status(500).send('Error fetching project.');
        }
    });

    router.post('/addProject', (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('User is not authenticated.'); }
        const name = req.body.name;
        const description = req.body.description;
        const project = new Project({ name: name, description: description, createdBy: (req.user as any)._id, testers: [] });
        project.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send('Error adding project.');
        })
    });

    router.put('/updateProject/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('User is not authenticated.'); }
        try {
            const project = await Project.findByIdAndUpdate(
                req.params.id,
                { name: req.body.name, description: req.body.description },
                { new: true }
            );
            res.status(200).json(project);
        } catch (err) {
            res.status(500).send('Error updating project.');
        }
    });


    return router;
}