import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, HydrateOptions } from "mongoose";

export type UserDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop()
  rating: number;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
