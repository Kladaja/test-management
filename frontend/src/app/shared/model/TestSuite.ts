export interface TestSuite {
    name: string;
    description?: string;
    project: string;
    testCases: [string];
    createdBy: string;
}