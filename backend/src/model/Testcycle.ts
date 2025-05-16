import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITestcycle extends Document {
    name: string;
    description?: string;
    project: mongoose.Types.ObjectId;
    testcases: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
}

const TestcycleSchema = new Schema<ITestcycle>({
    name: { type: String, required: true },
    description: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    testcases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Testcase', required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Testcycle: Model<ITestcycle> = mongoose.model<ITestcycle>('Testcycle', TestcycleSchema);