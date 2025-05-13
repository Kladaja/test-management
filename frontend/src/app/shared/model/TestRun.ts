export interface ITestRunResult {
    testCase: string;
    status: 'PASS' | 'FAIL' | 'NOT_RUN';
    notes?: string;
}

export interface TestRun {
    name: string;
    suite: string;
    executedBy: string;
    results: ITestRunResult[];
    executedAt: Date;
}