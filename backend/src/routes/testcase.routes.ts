import { Request, Response, Router } from "express";
import { TestCase } from "../model/TestCase";

export const testCaseRoutes = (): Router => {
    const router = Router();

    router.get('/getTestCasesByRequirement/:requirementId', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }
        try {
            const testCases = await TestCase.find({ requirement: req.params.requirement });
            res.status(200).json(testCases);
        } catch {
            res.status(500).send('Error fetching requirements.');
        }
    });

    router.post('/addTestCase', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) { res.status(401).send('Unauthorized'); }
        const { title, description, steps, expectedResult, requirement, project } = req.body;
        try {
            const testCase = new TestCase({
                title,
                description,
                steps,
                expectedResult,
                requirement,
                project,
                createdBy: (req.user as any)._id
            });
            const data = await testCase.save();
            res.status(200).send(data);
        } catch {
            res.status(500).send('Error adding test case.');
        }
    });

    router.put('/updateTestCase/:id', async (req: Request, res: Response) => {
        // TODO
    });

    router.delete('/deleteTestCase/:id', async (req: Request, res: Response) => {
        // TODO
    });

    return router;
};