import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITestcase extends Document {
    title: string;
    description?: string;
    steps: string[];
    expectedResult: string;
    status: 'not run' | 'passed' | 'skipped' | 'blocked' | 'failed';
    requirement: mongoose.Types.ObjectId;
    project: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
}

const TestcaseSchema = new Schema<ITestcase>({
    title: { type: String, required: true },
    description: String,
    steps: [String],
    expectedResult: { type: String, required: true },
    status: { type: String, enum: ['not run', 'passed', 'skipped', 'blocked', 'failed'], required: true },
    requirement: { type: mongoose.Schema.Types.ObjectId, ref: 'Requirement', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Testcase: Model<ITestcase> = mongoose.model<ITestcase>('Testcase', TestcaseSchema);