import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITestrunResult {
    testcase: mongoose.Types.ObjectId;
    status: 'not run' | 'passed' | 'skipped' | 'blocked' | 'failed';
    notes?: string;
}

export interface ITestrun extends Document {
    name: string;
    cycle: mongoose.Types.ObjectId;
    executedBy: mongoose.Types.ObjectId;
    results: ITestrunResult[];
    executedAt: Date;
}

const TestrunSchema = new Schema<ITestrun>({
    name: { type: String, required: true },
    cycle: { type: mongoose.Schema.Types.ObjectId, ref: 'Testcycle', required: true },
    executedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    results: [{
        testcase: { type: mongoose.Schema.Types.ObjectId, ref: 'Testcase', required: true },
        status: { type: String, enum: ['not run', 'passed', 'skipped', 'blocked', 'failed'], required: true },
        notes: String
    }],
    executedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Testrun: Model<ITestrun> = mongoose.model<ITestrun>('Testrun', TestrunSchema);