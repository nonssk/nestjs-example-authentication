import { ModelOptions, prop, Severity } from "@typegoose/typegoose";
import mongoose from "mongoose";

@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
export class BaseModel {
  @prop()
  public createdOn!: Date;

  @prop({ type: () => mongoose.Schema.Types.Mixed })
  public createdBy!: mongoose.Types.ObjectId | string;

  @prop()
  public updatedOn?: Date;

  @prop({ type: () => mongoose.Schema.Types.Mixed })
  public updatedBy?: mongoose.Types.ObjectId | string;

  @prop({ index: true, default: true })
  public active!: boolean;

  @prop({ index: true, default: false })
  public deleted!: boolean;
}
