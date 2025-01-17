import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RoleDoccument = HydratedDocument<Role>;

export class Role{
    @Prop({ required: true})
    name :string ;


}


export const RoleSchema = SchemaFactory.createForClass(Role)