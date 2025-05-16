import { Request, Response, Router } from "express";
import { Testcase } from "../model/Testcase";
import { Testcycle } from "../model/Testcycle";
import mongoose from "mongoose";

export const testcaseRoutes = (): Router => {
    const router = Router();

    router.get('/getTestcasesByRequirement/:requirementId', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        try {
            const testcases = await Testcase.find({ requirement: req.params.requirementId }).populate('createdBy', 'email');
            if (!testcases) res.status(404).send('Project not found.');
            else res.status(200).json(testcases);
        } catch { res.status(500).send('Error fetching test cases.'); }
    });

    router.get('/getTestcasesByProject/:projectId', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        try {
            const testcases = await Testcase.find({ project: req.params.projectId }).populate('createdBy', 'email');
            res.status(200).json(testcases);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error fetching testcases for project.');
        }
    });

    router.get('/getTestcasesByTestcycle/:testcycleId', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        try {
            const testcycle = await Testcycle.findById(req.params.testcycleId).populate('testcases').populate('createdBy', 'email');
            if (!testcycle) res.status(404).send('Test cycle not found.');
            else res.status(200).json(testcycle.testcases);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching testcases for testcycle.');
        }
    });

    router.get('/getTestcaseById/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        try {
            const testcase = await Testcase.findById(req.params.id).populate('createdBy', 'email');
            if (!testcase) res.status(404).json({ message: 'Requirement not found' });
            res.json(testcase);
        } catch (err) { res.status(500).json(err); }
    });

    router.post('/addTestcase', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        try {
            const { title, description, steps, expectedResult, status, requirementId, projectId } = req.body;
            const testcase = new Testcase({
                title,
                description,
                steps,
                expectedResult,
                status,
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

    router.post('/:testcaseId/addToTestcycle/:testcycleId', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) {
            res.status(401).send('Unauthorized');
            return;
        }
        try {
            const testcase = await Testcase.findById(req.params.testcaseId);
            const testcycle = await Testcycle.findById(req.params.testcycleId);
            if (!testcase) {
                res.status(404).send('Testcase not found.');
                return;
            }
            if (!testcycle) {
                res.status(404).send('Testcycle not found.');
                return;
            }
            if (testcycle.testcases.includes(testcase._id as mongoose.Types.ObjectId)) {

                res.status(400).send('Testcase already in testcycle.');
                return;
            }
            testcycle.testcases.push(testcase._id as mongoose.Types.ObjectId);
            await testcycle.save();
            res.status(200).json(testcase);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error adding testcase to testcycle.');
        }
    });


    router.post('/:testcaseId/removeFromTestcycle/:testcycleId', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) {
            res.status(401).send('Unauthorized');
            return;
        }
        try {
            const testcycle = await Testcycle.findById(req.params.testcycleId);
            if (!testcycle) {
                res.status(404).send('Testcycle not found.');
                return;
            }
            testcycle.testcases = testcycle.testcases.filter(tcId => tcId.toString() !== req.params.testcaseId);
            await testcycle.save();
            res.status(200).send('Testcase removed from testcycle.');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error removing testcase from testcycle.');
        }
    });


    router.put('/updateTestcase/:id', async (req: Request, res: Response) => {
        // TODO
    });

    router.delete('/deleteTestcase/:id', async (req: Request, res: Response) => {
        if (!req.isAuthenticated()) res.status(401).send('Unauthorized');
        try {
            const deleted = await Testcase.findByIdAndDelete(req.params.id);
            if (!deleted) res.status(404).send('Testcase not found.');
            res.status(200).send('Testcase deleted successfully.');
        } catch {
            res.status(500).send('Error deleting testcase.');
        }
    });

    return router;
};