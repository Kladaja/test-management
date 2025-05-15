import { Project } from "./Project";
import { Requirement } from "./Requirement";
import { User } from "./User";

export interface Testcase {
    _id: string;
    title: string;
    description?: string;
    steps: string[];
    expectedResult: string;
    requirement: Requirement;
    project: Project;
    createdBy: User;
}