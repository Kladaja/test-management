import { Project } from "./Project";
import { User } from "./User";

export interface Requirement {
    _id: string;
    description: string;
    project: Project;
    createdBy: User;
}