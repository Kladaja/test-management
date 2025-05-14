import { User } from "./User";

export interface Project {
    _id: string;
    name: string;
    description?: string;
    createdBy: User;
    testers: [User];
}