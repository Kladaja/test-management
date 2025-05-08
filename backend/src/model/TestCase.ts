import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITestCase extends Document {
    title: string;
    description?: string;
    steps: string[];
    expectedResult: string;
    requirement: mongoose.Types.ObjectId;
    project: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
}

const TestCaseSchema = new Schema<ITestCase>({
    title: { type: String, required: true },
    description: String,
    steps: [String],
    expectedResult: { type: String, required: true },
    requirement: { type: mongoose.Schema.Types.ObjectId, ref: 'Requirement', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const TestCase: Model<ITestCase> = mongoose.model<ITestCase>('TestCase', TestCaseSchema);