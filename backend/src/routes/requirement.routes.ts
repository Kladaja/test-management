import { Request, Response, Router } from "express";
import { Requirement } from "../model/Requirement";

export const requirementRoutes = (): Router => {
    const router = Router();

    router.get('/getRequirementsByProject/:projectId', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }
        try {
            const requirements = await Requirement.find({ project: req.params.projectId })
                .populate('createdBy', 'email')
                .exec();
            res.status(200).json(requirements);
        } catch {
            res.status(500).send('Error fetching requirements.');
        }
    });

    router.get('/getRequirementById/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }
        try {
            const requirement = await Requirement.findById(req.params.id).populate('createdBy', 'email');

            if (!requirement) {
                res.status(404).json({ message: 'Requirement not found' });
            }

            res.json(requirement);
        } catch (err) {
            console.error('Error fetching requirement by ID:', err);
            res.status(500).json({ message: 'Server error' });
        }
    });


    router.post('/addRequirement', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }
        const { description, projectId } = req.body;
        try {
            const requirement = new Requirement({
                description,
                project: projectId,
                createdBy: (req.user as any)._id
            });
            const data = await requirement.save();
            res.status(200).send(data);
        } catch {
            res.status(500).send('Error adding requirement.');
        }
    });

    router.put('/updateRequirement/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }

        const { description } = req.body;
        try {
            const updated = await Requirement.findByIdAndUpdate(
                req.params.id,
                { description },
                { new: true }
            );
            if (!updated) res.status(404).send('Requirement not found.');
            res.status(200).json(updated);
        } catch {
            res.status(500).send('Error updating requirement.');
        }
    });

    router.delete('/deleteRequirement/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }

        try {
            const deleted = await Requirement.findByIdAndDelete(req.params.id);
            if (!deleted) res.status(404).send('Requirement not found.');
            res.status(200).send('Requirement deleted successfully.');
        } catch {
            res.status(500).send('Error deleting requirement.');
        }
    });

    return router;
};