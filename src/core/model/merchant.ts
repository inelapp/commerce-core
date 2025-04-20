import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Merchant {
    @Prop(String)
    name: string;
    @Prop(String)
    slug: string;
    @Prop(String)
    email: string;
    @Prop(String)
    contactPhoneNumber: string;
    @Prop(String)
    status: string;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
export type MerchantDocument = Merchant & Document;