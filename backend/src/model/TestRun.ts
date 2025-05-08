import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITestRunResult {
    testCase: mongoose.Types.ObjectId;
    status: 'PASS' | 'FAIL' | 'NOT_RUN';
    notes?: string;
}

export interface ITestRun extends Document {
    name: string;
    suite: mongoose.Types.ObjectId;
    executedBy: mongoose.Types.ObjectId;
    results: ITestRunResult[];
    executedAt: Date;
}

const TestRunSchema = new Schema<ITestRun>({
    name: { type: String, required: true },
    suite: { type: mongoose.Schema.Types.ObjectId, ref: 'TestSuite', required: true },
    executedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    results: [{
        testCase: { type: mongoose.Schema.Types.ObjectId, ref: 'TestCase', required: true },
        status: { type: String, enum: ['PASS', 'FAIL', 'NOT_RUN'], required: true },
        notes: String
    }],
    executedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const TestRun: Model<ITestRun> = mongoose.model<ITestRun>('TestRun', TestRunSchema);