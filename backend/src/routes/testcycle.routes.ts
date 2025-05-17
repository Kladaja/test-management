import { Request, Response, Router } from "express";
import { Testcycle } from "../model/Testcycle";

export const testcycleRoutes = (): Router => {
    const router = Router();

    router.get('/getAllTestcycles', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        try {
            const testcycles = await Testcycle.find()
                .populate({
                    path: 'project',
                    populate: { path: 'testers', select: 'email firstName lastName' }
                })
                .populate('createdBy', 'email')
                .populate('testcases')
                .exec();
            res.status(200).json(testcycles);
        } catch {
            res.status(500).send('Error fetching testcycles.');
        }
    });

    router.get('/getTestcycleById/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        try {
            const testcycle = await Testcycle.findById(req.params.id).populate('createdBy', 'email').populate('project').exec();
            if (!testcycle) res.status(404).send('Testcycle not found.');
            res.status(200).json(testcycle);
        } catch {
            res.status(500).send('Error fetching testcycle.');
        }
    });

    router.post('/addTestcycle', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        const { name, description, projectId, testcases } = req.body;
        try {
            const testcycle = new Testcycle({
                name,
                description,
                project: projectId,
                testcases,
                createdBy: (req.user as any)._id,
            });
            const data = await testcycle.save();
            res.status(200).send(data);
        } catch {
            res.status(500).send('Error adding testcycle.');
        }
    });

    router.put('/updateTestcycleTestcases/:testcycleId', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');

        try {
            const { testcaseIds } = req.body;
            const updated = await Testcycle.findByIdAndUpdate(
                req.params.testcycleId,
                { testcases: testcaseIds },
                { new: true }
            ).populate('testcases');
            if (!updated) res.status(404).send('Testcycle not found.');
            res.status(200).json(updated);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating testcycle testcases.');
        }
    });


    router.put('/updateTestcycle/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        const { id } = req.params;
        const { name, description, projectId } = req.body;
        try {
            const updatedTestcycle = await Testcycle.findByIdAndUpdate(
                id,
                {
                    name,
                    description,
                    project: projectId
                },
                { new: true }
            );
            if (!updatedTestcycle) res.status(404).send('Testcycle not found');
            res.status(200).json(updatedTestcycle);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating testcycle.');
        }
    });

    router.delete('/deleteTestcycle/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        try {
            const deleted = await Testcycle.findByIdAndDelete(req.params.id);
            if (!deleted) res.status(404).send('Testcycle not found.');
            res.status(200).send('Testcycle deleted successfully.');
        } catch {
            res.status(500).send('Error deleting testcycle.');
        }
    });

    return router;
};