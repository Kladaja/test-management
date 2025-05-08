import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRequirement extends Document {
    title: string;
    description?: string;
    project: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
}

const RequirementSchema = new Schema<IRequirement>({
    title: { type: String, required: true },
    description: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Requirement: Model<IRequirement> = mongoose.model<IRequirement>('Requirement', RequirementSchema);