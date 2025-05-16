import { Request, Response, Router } from "express";
import { Testcase } from "../model/Testcase";

export const testcaseRoutes = (): Router => {
    const router = Router();

    router.get('/getTestcasesByRequirement/:requirementId', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        try {
            const testcases = await Testcase.find({ requirement: req.params.requirementId });
            if (!testcases) res.status(404).send('Project not found.');
            res.status(200).json(testcases);
        } catch {
            res.status(500).send('Error fetching test cases.');
        }
    });

    router.post('/addTestcase', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }
        try {
            const { title, description, steps, expectedResult, requirementId, projectId } = req.body;
            const testcase = new Testcase({
                title,
                description,
                steps,
                expectedResult,
                requirement: requirementId,
                project: projectId,
                createdBy: (req.user as any)._id
            });
            const data = await testcase.save();
            res.status(200).json(data);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error adding test case.');
        }
    });


    router.put('/updateTestcase/:id', async (req: Request, res: Response) => {
        // TODO
    });

    router.delete('/deleteTestcase/:id', async (req: Request, res: Response) => {
        // TODO
    });

    return router;
};