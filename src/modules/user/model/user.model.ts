import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class User {
    @Prop(String)
    name: string;

    @Prop(String)
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);