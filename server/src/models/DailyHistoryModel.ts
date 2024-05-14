import mongoose, { Schema, Document } from "mongoose";

export interface DailyHistory extends Document {
    day: string;
    data: {
        temperature: number;
        humidity: number;
        timestamp: string;
    }[];
}

const DailyHistorySchema = new Schema<DailyHistory>({
    day: { type: String, required: true, unique: true },
    data: [{
        temperature: { type: Number, required: true },
        humidity: { type: Number, required: true },
        timestamp: { type: String, required: true }
    }]
});

export default mongoose.model<DailyHistory>("DailyHistory", DailyHistorySchema);
