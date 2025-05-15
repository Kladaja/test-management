import { Request, Response, Router } from "express";
import { TestCase } from "../model/TestCase";

export const testcaseRoutes = (): Router => {
    const router = Router();

    router.get('/getTestcasesByRequirement/:requirementId', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        try {
            const testCases = await TestCase.find({ requirement: req.params.requirementId });
            if (!testCases) res.status(404).send('Project not found.');
            res.status(200).json(testCases);
        } catch {
            res.status(500).send('Error fetching test cases.');
        }
    });

    router.post('/addTestcase', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }
        try {
            const { title, description, steps, expectedResult, requirementId, projectId } = req.body;
            const testCase = new TestCase({
                title,
                description,
                steps,
                expectedResult,
                requirement: requirementId,
                project: projectId,
                createdBy: (req.user as any)._id
            });
            const data = await testCase.save();
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