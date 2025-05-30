import { Project } from "./Project";
import { Testcase } from "./Testcase";
import { User } from "./User";

export interface Testcycle {
    _id: string;
    name: string;
    description?: string;
    project: Project;
    testcases: Testcase[];
    createdBy: User;
}