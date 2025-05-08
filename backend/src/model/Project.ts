import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProject extends Document {
    name: string;
    description?: string;
    createdBy: mongoose.Types.ObjectId;
    testers: mongoose.Types.ObjectId[];
}

const ProjectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    testers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export const Project: Model<IProject> = mongoose.model<IProject>('Project', ProjectSchema);