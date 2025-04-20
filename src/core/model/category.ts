import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Merchant } from "./merchant";

@Schema({ versionKey: false, timestamps: true })
export class Category {
    @Prop({ type: String, required: true })
    name: string;

    @Prop(String)
    description: string;

    @Prop({ type: Array<String> })
    parents: string[];

    @Prop(String)
    img: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Merchant" })
    merchant: Merchant;

    @Prop({ type: String, required: true, default: "active" })
    status: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryDocument = Category & Document;