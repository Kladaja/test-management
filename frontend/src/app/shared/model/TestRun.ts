import { Testcase } from "./Testcase";
import { Testcycle } from "./Testcycle";
import { User } from "./User";

export interface ITestrunResult {
    testcase: Testcase;
    status: 'not run' | 'passed' | 'skipped' | 'blocked' | 'failed';
    notes?: string;
}

export interface Testrun {
    _id: string;
    name: string;
    cycle: Testcycle;
    executedBy: User;
    results: ITestrunResult[];
    executedAt: Date;
}