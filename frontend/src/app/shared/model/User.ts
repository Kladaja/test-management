export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: 'manager' | 'tester';
}