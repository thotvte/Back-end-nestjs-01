import { Category } from "@/modules/category/schemas/category.schema";
import { Company } from "@/modules/company/schemas/company.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsArray, IsString } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  stockQuantity: number;

  @Prop({default:0})
  discount: number;

  @Prop()
  color: string;

  @Prop()
  ram: string;

  @Prop()
  storageCapacity: string;

  @Prop()
  cpu: string;

  @Prop()
  gpu: string;

  @Prop()
  operatingSystem: string;

  @Prop()
  cpuSpeed :string;
  
  @Prop()
  cameraResolution:string

  @Prop()
  screenTechnology:string // công nghệ màn hình

  @Prop()
  screenResolution:string // độ phân giải màn hình 

  @Prop()
  widescreen:string // màn hình rộng

  @Prop()
  batteryCapacity: string // dung lương pin

  @Prop()
  maximumChargingSupport: string // hỗ trợ sạc tối đa 

  @Prop()
  design: string // thiết kế 

  @Prop()
  theLaunchTime: string; // thời gian ra mắt

  @Prop()
  material : string // chất liệu 

  @Prop()
  sizeAndVolume: string // kích thước và trọng lượng

  @IsArray()  
  @Prop([String])
  image: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category | string;  

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company | string;  

  @Prop({ default: true })
  isActive: boolean;  
}

export const ProductSchema = SchemaFactory.createForClass(Product);
