import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITestSuite extends Document {
    name: string;
    description?: string;
    project: mongoose.Types.ObjectId;
    testCases: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
}

const TestSuiteSchema = new Schema<ITestSuite>({
    name: { type: String, required: true },
    description: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    testCases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestCase' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const TestSuite: Model<ITestSuite> = mongoose.model<ITestSuite>('TestSuite', TestSuiteSchema);