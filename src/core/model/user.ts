import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Merchant } from "./merchant";
import mongoose, { Document } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class User {
    @Prop(String)
    username: string;
    @Prop({ type: String, unique: true, required: true })
    email: string;
    @Prop({ type: String, required: true })
    password: string;
    @Prop({ type: Array<String>, default: ['USER'] })
    roles: string[];
    @Prop({ type: Number, required: true, default: 0 })
    tokenVersion: number;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' })
    merchant: Merchant
    @Prop({ type: String, default: 'active' })
    status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;