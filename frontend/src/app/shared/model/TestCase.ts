export interface TestCase {
    title: string;
    description?: string;
    steps: string[];
    expectedResult: string;
    requirement: string;
    project: string;
    createdBy: string;
}