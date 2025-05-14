import { Request, Response, Router } from "express";
import { Project } from "../model/Project";

export const projectRoutes = (): Router => {
    const router = Router();

    router.get('/getAllProjects', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }
        try {
            const projects = await Project.find().populate('createdBy', 'email').exec();
            res.status(200).json(projects);
        } catch {
            res.status(500).send('Error fetching projects.');
        }
    });

    router.get('/getProjectById/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }
        try {
            const project = await Project.findById(req.params.id).populate('createdBy', 'email').exec();
            if (!project) res.status(404).send('Project not found.');
            res.status(200).json(project);
        } catch {
            res.status(500).send('Error fetching project.');
        }
    });

    router.post('/addProject', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }
        const { name, description } = req.body;
        try {
            const project = new Project({
                name,
                description,
                createdBy: (req.user as any)._id,
                testers: []
            });
            const data = await project.save();
            res.status(200).send(data);
        } catch {
            res.status(500).send('Error adding project.');
        }
    });

    router.put('/updateProject/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }
        try {
            const updated = await Project.findByIdAndUpdate(
                req.params.id,
                { name: req.body.name, description: req.body.description },
                { new: true }
            );
            res.status(200).json(updated);
        } catch {
            res.status(500).send('Error updating project.');
        }
    });

    router.delete('/deleteProject/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }

        try {
            const deleted = await Project.findByIdAndDelete(req.params.id);
            if (!deleted) res.status(404).send('Project not found.');
            res.status(200).send('Project deleted successfully.');
        } catch {
            res.status(500).send('Error deleting project.');
        }
    });

    return router;
};