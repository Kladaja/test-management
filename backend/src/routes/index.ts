import { Router } from 'express';
import { PassportStatic } from 'passport';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { projectRoutes } from './project.routes';
import { requirementRoutes } from './requirement.routes';
import { testcaseRoutes } from './testcase.routes';
import { testcycleRoutes } from './testcycle.routes';
import { testrunRoutes } from './testrun.routes';

export const configureRoutes = (passport: PassportStatic, router: Router): Router => {
    router.use('/auth', authRoutes(passport));
    router.use('/users', userRoutes());
    router.use('/projects', projectRoutes());
    router.use('/requirements', requirementRoutes());
    router.use('/testcases', testcaseRoutes());
    router.use('/testcycles', testcycleRoutes());
    router.use('/testruns', testrunRoutes());
    return router;
};