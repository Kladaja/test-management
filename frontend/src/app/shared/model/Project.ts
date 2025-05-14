import { User } from "./User";

export interface Project {
    name: string;
    description?: string;
    createdBy: User;
    testers: [User];
}