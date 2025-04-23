import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { GenericObject } from "../../types";
import { User } from "./user";

@Schema({ versionKey: false, timestamps: true })
export class RefreshToken {
    @Prop({ type: String, required: true })
    token: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;
    @Prop({ type: Date, required: true })
    expiresAt: Date;
    @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
    deviceInfo: GenericObject | string;
    @Prop({ type: Boolean, default: false })
    isRevoked: boolean;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
export type RefreshTokenDocument = RefreshToken & Document;
