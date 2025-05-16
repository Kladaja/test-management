import { Testcase } from "./Testcase";
import { Testcycle } from "./TestCycle";
import { User } from "./User";

export interface ITestrunResult {
    testcase: Testcase;
    status: 'not run' | 'passed' | 'skipped' | 'blocked' | 'failed';
    notes?: string;
}

export interface Testrun {
    name: string;
    cycle: Testcycle;
    executedBy: User;
    results: ITestrunResult[];
    executedAt: Date;
}